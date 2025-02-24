"use server"
import { NextRequest,NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/*
    This middleware is used to protect routes that require authentication.
    If the user is not authenticated, they will be redirected to the login page.
    If the user is authenticated, they will be redirected to the profile page.
*/

export const middleware = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token)
    const isAuthenticated = !!token;
  console.log(token)
  console.log(isAuthenticated)
    const isLoginPage = req.nextUrl.pathname.startsWith("/Login");
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    const isCreateBook = req.nextUrl.pathname.startsWith("/book/create")
    if(isCreateBook && isAuthenticated){
        return NextResponse.redirect(new URL("/login"))
    }
    const regis = req.nextUrl.pathname.startsWith("/register");
    if (regis && isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  
    return NextResponse.next();
}