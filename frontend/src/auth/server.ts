import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cookieStore = await cookies();
          return cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        async setAll(cookiesArr: { name: string; value: string; options?: CookieOptions }[]) {
          const cookieStore = await cookies();
          for (const cookie of cookiesArr) {
            cookieStore.set({
              name: cookie.name,
              value: cookie.value,
              ...(cookie.options || {}),
            });
          }
        },
      },
    }
  );
}

export async function getUser() {
  const { auth } = createSupabaseClient();
  const user = (await auth.getUser()).data.user;
  return user;
}

export async function protectRoute() {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
}