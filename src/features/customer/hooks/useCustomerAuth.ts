import { useState, useEffect } from "react";
import { type LiffProfile } from "../../../lib/liff";
import { supabase } from "../../../lib/supabase";
import { syncAuthUserToSupabase } from "../../../lib/supabase.service";

export function useCustomerAuth(navigate: (opts: { to: string }) => void) {
  const [liffReady, setLiffReady] = useState(false);
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [dbCustomer, setDbCustomer] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    let authListener: any = null;

    async function bootstrap(sessionToCheck?: any) {
      try {
        // 0. Guest mode
        if (localStorage.getItem("ran-lung-get-guest") === "true") {
          if (!cancelled) {
            setProfile({ userId: "guest", displayName: "ลูกค้าหน้าร้าน" } as LiffProfile);
            setLiffReady(true);
          }
          return;
        }

        // 1. Supabase session (email/password login)
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const finalSession = sessionToCheck || session;

        if (finalSession) {
          if (!cancelled) {
            const sbProfile: LiffProfile = {
              userId: finalSession.user.id,
              displayName: finalSession.user.email ?? "ผู้ใช้งาน",
              pictureUrl: undefined,
            };
            setProfile(sbProfile);
            setLiffReady(true);

            // Sync/fetch DB user and customer
            try {
              const res = await syncAuthUserToSupabase(finalSession.user);
              if (res) {
                setDbUser(res.user);
                setDbCustomer(res.customer);
              }
            } catch (e) {
              console.error("Failed to sync auth user:", e);
            }
          }
          return;
        }

        // 2. Default to guest mode so customer route always renders seamlessly
        if (!cancelled) {
          if (typeof window !== "undefined") {
            localStorage.setItem("ran-lung-get-guest", "true");
          }
          setProfile({ userId: "guest", displayName: "ลูกค้าหน้าร้าน" } as LiffProfile);
          setLiffReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[Auth Guard error]", err);
          if (typeof window !== "undefined") {
            localStorage.setItem("ran-lung-get-guest", "true");
          }
          setProfile({ userId: "guest", displayName: "ลูกค้าหน้าร้าน" } as LiffProfile);
          setLiffReady(true);
        }
      }
    }

    const { data } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (event === "SIGNED_IN" && session) {
        bootstrap(session);
      }
    });
    authListener = data.subscription;

    bootstrap();

    return () => {
      cancelled = true;
      if (authListener) authListener.unsubscribe();
    };
  }, [navigate]);

  return {
    liffReady,
    setLiffReady,
    profile,
    setProfile,
    dbUser,
    setDbUser,
    dbCustomer,
    setDbCustomer,
  };
}
