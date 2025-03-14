import { apiKey, BASE_URL } from '@/assets/constants';

export const searchMovies = async (search: string, include: boolean = true) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${apiKey}&query=${search}&include_adult=${include}&language=en-US&page=1`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getPerson = async (id: number) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}?api_key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const fetchMoviesByGenre = async (genreId: number) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data by genreId');
  }

  const data = await response.json();
  return data.results;
};
