import { API_KEY, BASE_URL } from '@/assets/constants';
import { db } from '@/assets/firebaseConfig';
import { Movies } from '@/assets/types';
import { ref, push, get, remove } from 'firebase/database';

export const searchMovies = async (
  search: string | null,
  page: number = 1,
  include: boolean = true
) => {
  if (!search) return;

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}&include_adult=${include}&language=en-US&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getPerson = async (id: number) => {
  const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const fetchMoviesByGenre = async (genreId: string | undefined) => {
  if (!genreId) return;

  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data by genreId');
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieTrailer = async (movieId: string): Promise<string> => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error('Failed to fetch movie trailer');

  const data = await res.json();

  // Find the first YouTube trailer
  const trailer = data.results.find(
    (video: { type: string; site: string }) =>
      video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : 'https://www.youtube.com/embed/RmgMd-eeCe0';
};

export const addMovie = async (data: Movies) => {
  const userRef = ref(db, 'movies');
  return await push(userRef, data);;
};

export const fetchMovies = async ()  => {
  try {
    const snapshot = await get(ref(db, 'movies'));

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();

    return Object.entries(data).map(([id, value]) => {
      if (typeof value === 'object' && value !== null) {
        return {
          id,
          ...value,
        } as Movies; 
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

export const deleteItem = (movieId: string) => {
  return remove(ref(db, `/movies/${movieId}`));
};
