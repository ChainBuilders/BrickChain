// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseClient } from "@/auth/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const path = new URL(request.url).pathname;

  // Define protected routes (all dashboard routes)
  const protectedRoutes = [
    "/investor-dashboard",
    "/realtor-dashboard",
    "/dashboard",
    "/profile"
  ];

  // Define auth routes (login/signup)
  const authRoutes = ["/login", "/create-account"];

  // Check if current route needs auth handling
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  if (isProtectedRoute || isAuthRoute) {
    try {
      const supabase = createSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();

      // Handle protected routes for unauthenticated users
      if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Handle auth routes for authenticated users
      if (isAuthRoute && session) {
        const dashboardPath = session.user.user_metadata?.user_type === "realtor"
          ? "/realtor-dashboard"
          : "/investor-dashboard";
        return NextResponse.redirect(new URL(dashboardPath, request.url));
      }
    } catch (error) {
      console.error("Middleware auth error:", error);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};