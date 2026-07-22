import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "https://placeholder-project-url.supabase.co";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "placeholder-key";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Using fallbacks to prevent startup crash.");
}

const originalSupabase = createClient(supabaseUrl, supabaseAnonKey) as any;

// Helper to get active dev bypass role
export function getDevBypassRole(): string | null {
  if (typeof window === "undefined") return null;
  
  // 1. Check if user explicitly selected a role in the Dev panel
  const localRole = localStorage.getItem("dev-bypass-role");
  if (localRole && localRole !== "none") return localRole;

  // 2. Read from environment variable
  const envRole = import.meta.env.VITE_DEV_BYPASS_ROLE as string;
  if (envRole && envRole !== "none") return envRole;

  // 3. Fallback to path-based auto-detection to disable all login checks globally
  const path = window.location.pathname;
  if (path.includes("/admin")) return "admin";
  if (path.includes("/staff")) return "staff";
  if (path.includes("/captain")) return "captain";
  if (path.includes("/customer")) return "customer";

  // Default to customer role for root `/` or other routes
  return "customer";
}

// Dev mock data generators
const getMockUser = (role: string) => {
  const userId = `dev-user-id-${role}`;
  return {
    id: userId,
    email: `dev-${role}@example.com`,
    role: "authenticated",
    aud: "authenticated",
    app_metadata: { provider: "email" },
    user_metadata: {
      full_name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      display_name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

const getMockUserDbRow = (role: string) => {
  const userId = `dev-user-id-${role}`;
  return {
    id: `dev-db-id-${role}`,
    auth_user_id: userId,
    line_user_id: `dev-line-${role}`,
    display_name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    email: `dev-${role}@example.com`,
    picture_url: null,
    status_message: "Developing...",
    is_active: true,
    role: role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
  };
};

const getMockCustomerDbRow = (role: string) => {
  return {
    id: `dev-customer-id-${role}`,
    user_id: `dev-db-id-${role}`,
    line_user_id: `dev-line-${role}`,
    display_name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    phone: "0812345678",
    email: `dev-${role}@example.com`,
    default_address: null,
    default_address_type: null,
    notes: null,
    total_orders: 0,
    total_spent: 0,
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// Custom query builder for intercepted mock tables
class MockQueryBuilder {
  constructor(private table: string, private role: string) {}

  select() { return this; }
  eq() { return this; }
  single() {
    return Promise.resolve({
      data: this.table === "users" ? getMockUserDbRow(this.role) : getMockCustomerDbRow(this.role),
      error: null,
    });
  }
  maybeSingle() {
    return Promise.resolve({
      data: this.table === "users" ? getMockUserDbRow(this.role) : getMockCustomerDbRow(this.role),
      error: null,
    });
  }
  upsert() { return this; }
  insert() { return this; }
  update() { return this; }
  
  then(onfulfilled: any) {
    const data = this.table === "users" ? getMockUserDbRow(this.role) : getMockCustomerDbRow(this.role);
    return Promise.resolve({
      data: data,
      error: null,
    }).then(onfulfilled);
  }
}

// Proxied Supabase client
export const supabase = new Proxy(originalSupabase, {
  get(target, prop, receiver) {
    if (prop === "auth") {
      const auth = Reflect.get(target, prop, receiver);
      return new Proxy(auth, {
        get(authTarget, authProp) {
          if (authProp === "signOut") {
            return async (...args: any[]) => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("dev-bypass-role");
              }
              return authTarget.signOut(...args);
            };
          }
          const bypassRole = getDevBypassRole();
          if (bypassRole) {
            if (authProp === "getSession") {
              return async () => {
                const user = getMockUser(bypassRole);
                return {
                  data: {
                    session: {
                      access_token: "mock-dev-token",
                      refresh_token: "mock-dev-token",
                      expires_in: 3600,
                      expires_at: Math.floor(Date.now() / 1000) + 3600,
                      token_type: "bearer",
                      user,
                    },
                  },
                  error: null,
                };
              };
            }
            if (authProp === "getUser") {
              return async () => {
                const user = getMockUser(bypassRole);
                return {
                  data: { user },
                  error: null,
                };
              };
            }
            if (authProp === "onAuthStateChange") {
              return (callback: any) => {
                const user = getMockUser(bypassRole);
                const session = {
                  access_token: "mock-dev-token",
                  refresh_token: "mock-dev-token",
                  expires_in: 3600,
                  expires_at: Math.floor(Date.now() / 1000) + 3600,
                  token_type: "bearer",
                  user,
                };
                // Fire callback immediately
                setTimeout(() => {
                  callback("SIGNED_IN", session);
                }, 0);
                return {
                  data: {
                    subscription: {
                      unsubscribe: () => {},
                    },
                  },
                };
              };
            }
          }
          return Reflect.get(authTarget, authProp);
        },
      });
    }

    if (prop === "from") {
      const fromMethod = Reflect.get(target, prop, receiver);
      return function (table: string) {
        const bypassRole = getDevBypassRole();
        if (bypassRole && (table === "users" || table === "customers")) {
          return new MockQueryBuilder(table, bypassRole);
        }
        return fromMethod.apply(target, [table]);
      };
    }

    return Reflect.get(target, prop, receiver);
  },
});

