import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/admin/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes — leave everything else completely untouched
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // The login page itself is always accessible
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isAuthenticated = await getSessionFromRequest(req);

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on /admin/* paths
  matcher: ["/admin/:path*"],
};
