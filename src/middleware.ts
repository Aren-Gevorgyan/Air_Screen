import { ACTION_GENRE_ID } from '@/assets/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const genre = url.searchParams.get('genre');
  const filterValue = url.searchParams.get('value');

  if (url.pathname === '/') {
    if (!genre) {
      url.searchParams.set('genre', ACTION_GENRE_ID);
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === '/search') {
    if (!filterValue) {
      url.pathname = '/';
      url.href = `${request.nextUrl.origin}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/search'],
};
