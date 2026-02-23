import { ACTION_GENRE_ID } from '@/assets/constants';
import { routing } from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const customMiddleware = async (request: NextRequest) => {
  try {
    const url = request.nextUrl.clone();
    const genre = url.searchParams.get('genre');
    const filterValue = url.searchParams.get('value');
    const locale = url.pathname.split('/')[1];

    if (url.pathname === `/${locale}` && !genre) {
      url.searchParams.set('genre', ACTION_GENRE_ID);
      return NextResponse.redirect(url);
    }

    if (url.pathname === `/${locale}/search` && !filterValue) {
      url.pathname = '/';
      url.href = `${request.nextUrl.origin}${url.pathname}`;
      return NextResponse.redirect(url);
    }

    return null;
  } catch {
    return null;
  }
};

export default async function middleware(request: NextRequest) {
  const customResponse = await customMiddleware(request);

  if (customResponse) {
    return customResponse;
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api|trpc).*)'],
};
