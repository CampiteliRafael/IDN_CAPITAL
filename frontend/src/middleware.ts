import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ROUTES } from '@/constants/routes';

const PUBLIC_ROUTES: string[] = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('token');
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if ((pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
