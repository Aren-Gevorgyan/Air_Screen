import { fetchSavedMovies } from '@/requests/firebase';
import { getMovie } from '@/requests/ssr';

import Moon from '@/components/moon';
import Movies from '@/pagesComponents/saved/movies';

import styles from './styles.module.scss';

const GUEST_USER_ID: string | null = null;

const Saved = async () => {
  let isLoading = true;
  const savedMovies = await fetchSavedMovies(GUEST_USER_ID);
  const requests =
    savedMovies?.moviesId?.map((val: number) => getMovie(String(val))) ?? [];
  try {
    const data = await Promise.all(requests);
    isLoading = false;
    return (
      <div className={styles.container}>
        <Moon />
        <Movies data={data} isLoading={isLoading} />
      </div>
    );
  } catch {
    return <span className={styles.isEmpty}>{'There is not data'}</span>;
  }
};

export default Saved;
