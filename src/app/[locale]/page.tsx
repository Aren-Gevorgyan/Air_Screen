import React, { FC } from 'react';
import styles from './styles.module.scss';
import Moon from '@/components/moon';
import { getMainPageData } from '@/requests/ssr';
import Genre from '@/pagesComponents/main/genre';
import Popular from '@/pagesComponents/main/poplare';

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
          <Popular popular={data.popular} />
          <Genre genres={data.genres} genresByIdData={data.genresByIdData} />
        </main>
      </div>
    </div>
  );
};

export default Home;
