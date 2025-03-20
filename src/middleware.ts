import { ACTION_GENRE_ID } from '@/assets/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const genre = url.searchParams.get('genre');
  const filterValue = url.searchParams.get('value');
  const locale = url.pathname.split('/')[1]; // Get the first path segment as locale

  if (!locale || !['en', 'hy'].includes(locale)) { // Add supported locales here
    url.pathname = `/en${url.pathname.substring(3)}`; // Redirect to '/en' if no valid locale
    return NextResponse.redirect(url);
  }

  if (url.pathname === `/${locale}`) {
    if (!genre) {
      url.searchParams.set('genre', ACTION_GENRE_ID);
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === `/search/${locale}`) {
    if (!filterValue) {
      url.pathname = '/';
      url.href = `${request.nextUrl.origin}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
