const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "",
  claudeApiKey: import.meta.env.VITE_CLAUDE_API_KEY ?? "",
  appUrl: import.meta.env.VITE_APP_URL ?? "http://localhost:5173",
};

export function hasSupabaseEnv() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export default env;

