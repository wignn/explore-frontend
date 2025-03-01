"use server"
import { NextRequest,NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/*
    This middleware is used to protect routes that require authentication.
    If the user is not authenticated, they will be redirected to the login page.
    If the user is authenticated, they will be redirected to the profile page.
*/
export const middleware = async (req: NextRequest) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = !!token;
    const isAdmin = token?.isAdmin;


    const isLoginPage = req.nextUrl.pathname.startsWith("/login");
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    const isProfilePage = req.nextUrl.pathname.startsWith("/profile");
    if (isProfilePage && !isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isBookmark = req.nextUrl.pathname.startsWith("/bookmark");
    if (isBookmark && !isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isDashboard = req.nextUrl.pathname.startsWith("/dasboard")
    if(isDashboard && !isAuthenticated){
      if(!isAdmin){
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    const regis = req.nextUrl.pathname.startsWith("/register");
    if (regis && isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

    return NextResponse.next({headers});
}