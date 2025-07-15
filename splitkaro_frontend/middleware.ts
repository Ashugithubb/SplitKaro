
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
  console.log(' Middleware triggered:', request.nextUrl.pathname);
    if(token){
        return NextResponse.next();
    }
  return  NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    '/home',
    '/expense',
    '/expense/:path*',
    '/group',
    '/group/:path*',
    '/profile',
  ],
};


// Allow public routes
  // const publicPaths = ['/home', '/login', '/register'];
  // if (publicPaths.includes(pathname)) {
  //   return NextResponse.next();
  // }
