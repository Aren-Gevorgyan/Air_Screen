import { ACTION_GENRE_ID } from '@/assets/constants';
import { routing } from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const customMiddleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const genre = url.searchParams.get('genre');
  const filterValue = url.searchParams.get('value');
  const locale = url.pathname.split('/')[1];

  if (url.pathname === `/${locale}`) {
    if (!genre) {
      url.searchParams.set('genre', ACTION_GENRE_ID);
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === `/${locale}/search`) {
    if (!filterValue) {
      url.pathname = '/';
      url.href = `${request.nextUrl.origin}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return null;
};

export const middleware = (request: NextRequest) => {
  const customResponse = customMiddleware(request);
  if (customResponse) {
    return customResponse;
  }

  return createMiddleware(routing)(request);
};

// Configure the matcher to run middleware for the appropriate paths.
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
