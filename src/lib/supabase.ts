import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "https://placeholder-project-url.supabase.co";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "placeholder-key";

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Using fallbacks to prevent startup crash.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) as any;
