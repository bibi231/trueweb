import { NextResponse, type NextRequest } from "next/server";

const REF_COOKIE = "tw_ref";
const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Affiliate attribution: when a visitor lands with ?ref=CODE, persist the
  // code for 30 days so a later checkout can credit the referrer. First touch
  // wins — don't overwrite an existing cookie.
  const ref = request.nextUrl.searchParams.get("ref");
  if (ref && /^[a-z0-9]{4,12}$/i.test(ref) && !request.cookies.get(REF_COOKIE)) {
    response.cookies.set(REF_COOKIE, ref.toLowerCase(), {
      maxAge: REF_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  // Run on all pages (to catch ?ref on any landing URL) plus the gated areas.
  // Skip Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
