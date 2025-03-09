import { Tab } from "./types";

export const IMAGE_URL: string = 'https://image.tmdb.org/t/p/w342';
export const BASE_URL: string = 'https://api.themoviedb.org/3/movie';

export const breakpoints = {
  480: { slidesPerView: 1 }, // Small tablets
  768: { slidesPerView: 2 }, // Tablets
  1024: { slidesPerView: 4 }, // Laptops
  1280: { slidesPerView: 5 }, // Laptops
  1680: { slidesPerView: 6 }, // Desktops
};

export const tabs: Tab[] = [
  { title: 'HOME', url: '/' },
  { title: 'MOVIES', url: '/movies' },
  { title: 'SERIALS', url: '/serials' },
  { title: 'MY LISTS', url: '/my_lists' },
];

export const apiKey = process.env.NEXT_PUBLIC_TM_DB_API_KEY;