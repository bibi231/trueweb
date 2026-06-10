import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Expose the current pathname to server components via a custom header,
  // so the portal layout can detect /portal/login and skip the auth redirect.
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
