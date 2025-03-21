import { Languages } from "./types";

export const IMAGE_URL: string = 'https://image.tmdb.org/t/p/original';
export const BASE_URL: string = 'https://api.themoviedb.org/3';
export const API_KEY = process.env.NEXT_PUBLIC_TM_DB_API_KEY;
export const ACTION_GENRE_ID = '28';
export const LOCALES = ['en', 'hy', 'ru'];
export const DEFAULT_LOCALE = 'en';

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

export const languages: Array<Languages> = [{
  country: 'en',
  flag: '🇬🇧'
},
{
  country: 'ru',
  flag: '🇷🇺'
},
{
  country: 'hy',
  flag: '🇦🇲'
}
];