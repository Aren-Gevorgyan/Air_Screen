import { Tab } from './types';

export const IMAGE_URL: string = 'https://image.tmdb.org/t/p/w342';
export const BASE_URL: string = 'https://api.themoviedb.org/3';

export const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export const tabs: Tab[] = [
  { title: 'HOME', url: '/' },
  { title: 'MOVIES', url: '/movies' },
  { title: 'SERIALS', url: '/serials' },
  { title: 'MY LISTS', url: '/my_lists' },
];

export const apiKey = process.env.NEXT_PUBLIC_TM_DB_API_KEY;
