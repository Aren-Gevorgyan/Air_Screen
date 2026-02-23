'use client';

import { useEffect, useState } from 'react';
import { fetchSavedMovies } from '@/requests/firebase';
import { getMovie } from '@/requests/ssr';

import Moon from '@/components/moon';
import Movies from '@/pagesComponents/saved/movies';

import styles from './styles.module.scss';
import { MovieData } from '@/assets/types';
import { useGuestUserId } from '@/hooks/useGuestUserId';

const Saved = () => {
  const userId = useGuestUserId();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    const load = async () => {
      try {
        const savedMovies = await fetchSavedMovies(userId);
        const requests =
          savedMovies?.moviesId?.map((val: number) =>
            getMovie(String(val))
          ) ?? [];
        const data = await Promise.all(requests);

        if (!cancelled) {
          setMovies(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('Saved page error:', error);
        if (!cancelled) {
          setMovies([]);
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <div className={styles.container}>
      <Moon />
      <Movies data={movies} isLoading={isLoading} />
    </div>
  );
};

export default Saved;

