import React, { FC } from 'react';
import styles from './styles.module.scss';
import Moon from '@/components/moon';
import { getMainPageData } from '@/requests/ssr';
import Genre from '@/pages/main/genre';
import Popular from '@/pages/main/poplare';

type Props = {
  searchParams: Promise<{ genre: string }>;
};

const Home: FC<Props> = async ({ searchParams }) => {
  const genre = (await searchParams).genre;
  const data = await getMainPageData(genre);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Moon />
        <main>
          <Popular data={data} />
          <Genre genres={data.genres} genresByIdData={data.genresByIdData} />
        </main>
      </div>
    </div>
  );
};

export default Home;
