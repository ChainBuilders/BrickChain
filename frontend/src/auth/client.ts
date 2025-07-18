// src/auth/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
  // Add validation before creating client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `Supabase URL or Key missing!\nURL: ${supabaseUrl}\nKey: ${supabaseKey?.slice(0, 5)}...`
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}