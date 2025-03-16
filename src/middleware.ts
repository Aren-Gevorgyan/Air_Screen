import { ACTION_GENRE_ID } from '@/assets/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl;
  const genre = url.searchParams.get('genre');

  if (!genre) {
    url.searchParams.set('genre', ACTION_GENRE_ID);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

// Apply middleware to specific paths
export const config = {
  matcher: '/',
};
