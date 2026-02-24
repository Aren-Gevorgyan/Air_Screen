import { Languages } from './types';

export const IMAGE_URL: string = 'https://image.tmdb.org/t/p/original';
export const BASE_URL: string = 'https://api.themoviedb.org/3';
export const API_KEY = process.env.NEXT_PUBLIC_TM_DB_API_KEY;
export const ACTION_GENRE_ID = '28';
export const LOCALES = ['en', 'hy', 'ru'];
export const DEFAULT_LOCALE = 'hy';

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1000 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1000, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export const languages: Array<Languages> = [
  {
    country: 'en',
    flag: 'us',
  },
  {
    country: 'ru',
    flag: 'ru',
  },
  {
    country: 'hy',
    flag: 'am',
  },
];

// Order / booking related constants
export const ORDER_TIME_MIN = '20:30';
export const ORDER_TIME_MAX = '23:00';
export const ORDER_MINUTES_MIN = 20 * 60 + 30;
export const ORDER_MINUTES_MAX = 23 * 60 + 0;

export const GENERAL_GUEST_PRICE = 3000;
export const INDIVIDUAL_PRICE_UP_TO_TWO = 25000;
export const INDIVIDUAL_PRICE_THREE_OR_MORE = 30000;
export const POPCORN_PRICE = 500;
export const KALIAN_PRICE = 5000;
export const ROMANTIC_DINNER_PRICE = 15000;

export const MOBILE_BREAKPOINT = 768;
