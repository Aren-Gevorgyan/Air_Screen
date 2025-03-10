import { ChangeEvent } from 'react';

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[]; // Assuming it's an array of numbers
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Tab = {
  title: string;
  url: string;
};

export type BooleanHook = {
  state: boolean;
  setTrue: () => void;
  setFalse: () => void;
  setToggle: () => void;
};

export type InputParamter = ChangeEvent<HTMLInputElement>;
