import { createClient } from "@supabase/supabase-js";
import env, { hasSupabaseEnv } from "./env";

const fallbackUrl = "https://placeholder.supabase.co";
const fallbackKey = "placeholder-anon-key";

function getSafeConfig() {
  if (!hasSupabaseEnv()) {
    return {
      url: fallbackUrl,
      key: fallbackKey,
    };
  }

  const url = String(env.supabaseUrl || "").trim();
  const key = String(env.supabaseAnonKey || "").trim();

  if (!url.startsWith("http")) {
    return {
      url: fallbackUrl,
      key: fallbackKey,
    };
  }

  return { url, key };
}

const config = getSafeConfig();

export const supabase = createClient(config.url, config.key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
