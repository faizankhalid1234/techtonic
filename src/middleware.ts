import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION = "techtonic_session";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/checkout")) {
    return NextResponse.next();
  }
  const token = request.cookies.get(SESSION)?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", "checkout");
    return NextResponse.redirect(url);
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", "checkout");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/checkout"],
};
