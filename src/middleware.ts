import { ACTION_GENRE_ID } from '@/assets/constants';
import { routing } from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { clerkMiddleware, ClerkMiddlewareAuth } from '@clerk/nextjs/server';

// Custom Middleware Logic
const customMiddleware = async (
  request: NextRequest,
  auth: ClerkMiddlewareAuth
) => {
  const { userId } = await auth(); // Wait for Clerk authentication
  const url = request.nextUrl.clone();
  const genre = url.searchParams.get('genre');
  // const isAuth = url.searchParams.get('auth');
  const filterValue = url.searchParams.get('value');
  const locale = url.pathname.split('/')[1];

  // const protectedRoutes = [`/${locale}/my_orders`, `/${locale}/saved`, `/${locale}/order`];
  const protectedRoutes = [`/${locale}/order`];
  const isCoincide = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // Redirect if user is not authenticated on protected routes
  if (isCoincide && !userId) {
    // if (!isAuth) {
    //   url.searchParams.set('auth', 'false');
    //   const redirect = url.href.includes('my_orders') ? url : new URL('/', request.url);
    return NextResponse.redirect(new URL('/', request.url));
    // }
  }

  // Ensure default genre is set
  if (url.pathname === `/${locale}` && !genre) {
    url.searchParams.set('genre', ACTION_GENRE_ID);
    return NextResponse.redirect(url);
  }

  // Redirect to home if no filter value in search
  if (url.pathname === `/${locale}/search` && !filterValue) {
    url.pathname = '/';
    url.href = `${request.nextUrl.origin}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  // Return null to let further middleware proceed if no redirects are required
  return null;
};

// Combine Clerk Middleware with Custom Logic
export default clerkMiddleware(async (auth, request) => {
  // Handle authentication and custom routing logic
  const customResponse = await customMiddleware(request, auth);

  // If a redirect is required, return it immediately
  if (customResponse) {
    return customResponse;
  }

  // Proceed with internationalization middleware (next-intl) if no redirect is needed
  return createMiddleware(routing)(request);
});

// Matcher to apply the middleware to all routes except the specified ones
export const config = {
  matcher: ['/((?!_next|.*\\..*|api|trpc).*)'], // Match all routes except _next, static files, API, and trpc
};
