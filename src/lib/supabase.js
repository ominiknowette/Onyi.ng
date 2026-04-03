import { createClient } from "@supabase/supabase-js";
import env, { hasSupabaseEnv } from "./env";

const fallbackUrl = "https://placeholder.supabase.co";
const fallbackKey = "placeholder-anon-key";

export const supabase = createClient(
  hasSupabaseEnv() ? env.supabaseUrl : fallbackUrl,
  hasSupabaseEnv() ? env.supabaseAnonKey : fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);

