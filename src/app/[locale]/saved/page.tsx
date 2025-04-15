import React from 'react';
import { fetchSavedMovies } from '@/requests/firebase';
import { auth } from '@clerk/nextjs/server';
import { getMovie } from '@/requests/ssr';

import Moon from '@/components/moon';
import Movies from '@/pagesComponents/saved/movies';

import styles from './styles.module.scss';
import WithAuth from '@/hoc/withAuth';

const Saved = async () => {
  const { userId } = await auth();
  let isLoading = true;
  const svaedMovies = await fetchSavedMovies(userId);
  const requests = svaedMovies?.moviesId?.map((val: number) => getMovie(val));
  const data = await Promise.all(requests);
  isLoading = false;

  return (
    <div className={styles.container}>
      <Moon />
      <Movies data={data} isLoading={isLoading} />
    </div>
  );
};

export default WithAuth(Saved);
