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
