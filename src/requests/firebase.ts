import { db } from '@/assets/firebaseConfig';
import { Movies } from '@/assets/types';
import { ref, push, get, remove, update, query, orderByChild, equalTo, set } from 'firebase/database';

export const addMovie = async (data: Movies) => {
  const userRef = ref(db, 'movies');
  return await push(userRef, data);;
};

export const saveMovie = async (moviesId: number[], userId?: string | null,) => {
  const data = {
    userId,
    moviesId
  };

  const userMoviesRef = ref(db, `saved/${userId}`);
  await set(userMoviesRef, data);
};


export const fetchMovies = async () => {
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

export const unsave = async (
  currentMovies: Array<number>,
  movieIdToRemove: number,
  userId?: string | null,
) => {
  const updatedArray = currentMovies.filter((id) => id !== movieIdToRemove);

  try {
    await update(ref(db, `saved/${userId}`), {
      moviesId: updatedArray,
    });
  } catch (error) {
    console.error("Error updating moviesId:", error);
  }
};

export const editItem = async (movieId: string, updatedData: Partial<Movies>) => {
  try {
    const movieRef = ref(db, `/movies/${movieId}`);
    await update(movieRef, updatedData);
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};

export const fetchMovieById = async (movieId: string): Promise<Movies | null> => {
  try {
    const movieRef = ref(db, `/movies/${movieId}`);
    const snapshot = await get(movieRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: movieId,
      ...snapshot.val(),
    } as Movies;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return null;
  }
};

export const fetchMoviesByUserId = async (userId?: string | null) => {
  if (!userId) return
  try {
    const moviesRef = ref(db, 'movies');
    const userMoviesQuery = query(moviesRef, orderByChild('userId'), equalTo(userId));
    const snapshot = await get(userMoviesQuery);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();

    return Object.entries(data).map(([id, movie]) => ({
      id,
      ...(movie as Omit<Movies, 'id'>),
    }));
  } catch (error) {
    console.log('Error fetching movies by userId:', error);
    return [];
  }
};


export const fetchSavedMovies = async (userId?: string | null) => {
  if (!userId) return;
  try {
    const userRef = ref(db, `saved/${userId}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("No data available for this user.");
      return null;
    }

    const data = snapshot.val();
    return data; // Contains userId and moviesId
  } catch (error) {
    console.error("Error fetching user movies:", error);
    return null;
  }
};
