import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = [
  '/payment',
  '/work/new',
  '/profile',
  '/profile/edit',
];

const authRoutes = ['/login', '/signup'];

const isDynamicProtectedRoute = (pathname: string): boolean => {
  // Add more dynamic routes here
  const workEditPattern = /^\/work\/[^\/]+\/edit\/?$/;
  return workEditPattern.test(pathname);
};

const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const isDynamicProtected = isDynamicProtectedRoute(pathname);

  const isAuthRoute = authRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthenticated = token ? await verifyToken(token) : false;

  if ((isProtectedRoute || isDynamicProtected) && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
