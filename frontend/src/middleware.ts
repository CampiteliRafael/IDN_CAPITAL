import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('token');
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
