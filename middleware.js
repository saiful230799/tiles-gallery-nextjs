import { NextResponse } from "next/server";

export function middleware(request) {

    const sessionCookie = request.cookies.get("better-auth.session_token") || 
                          request.cookies.get("__Secure-better-auth.session_token");

    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/my-profile", "/add-tiles", "/update"];
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (!sessionCookie && isProtected) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {

    matcher: ["/my-profile/:path*", "/add-tiles/:path*", "/update/:path*"],
};