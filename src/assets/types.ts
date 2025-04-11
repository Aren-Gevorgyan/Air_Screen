import { ChangeEvent } from 'react';

export type ProductionCompaniesType = {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
};

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Array<GenresType>;
  production_companies: Array<ProductionCompaniesType>;
  genre_ids: Array<number>;
  origin_country: Array<string>;
};

export type Tab = {
  title: string;
  url: string;
  active: boolean
};

export type Movies = {
  id?: string;
  userId?: string | null;
  filmId: string;
  date: string;
  name: string;
  hour: string;
  phone: string;
};

export type Languages = {
  country: string;
  flag: string;
};

export type GenresType = { id: number; name: string };

export type PropsMeta = {
  params: Promise<{ locale: string }>
}

export type BooleanHook = {
  state: boolean;
  setTrue: () => void;
  setFalse: () => void;
  setToggle: () => void;
};

export type InputParamter = ChangeEvent<HTMLInputElement>;

export type ActorsType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  birthday?: string;
  place_of_birth?: string;
  biography?: string;
};
