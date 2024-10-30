import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const tokenObject = request.cookies.get('bearer');
  const tokenString = tokenObject ? tokenObject.value : '';


  if (request.nextUrl.pathname === '/') {
    if (!tokenString) {
      console.log('Redirecting to /auth');
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (['/dashboard', '/dashboard/sections/'].some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!tokenString) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/auth') {
    if (tokenString) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth'],
};