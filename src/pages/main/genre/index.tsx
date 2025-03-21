'use client';

import React, { FC, useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { GenresType, MovieData } from '@/assets/types';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import useQueryParam from '@/hooks/useQueryParam';
import GenreMovies from './genreMovies';

type Props = {
  genres: Array<GenresType>;
  genresByIdData: Array<MovieData>;
};

const Genre: FC<Props> = ({ genres, genresByIdData }) => {
  const genre = useQueryParam('genre');
  const { push } = useRouter();
  const [genreId, setGenreId] = useState<string>();

  const onClick = useCallback(
    (genreId: string) => () => {
      setGenreId(genreId);
      push(`?genre=${genreId}`, { scroll: false });
    },
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.genres}>
        {genres.map((val: GenresType) => {
          const id = String(val.id);
          const isActive = genreId === id || genre === id;
          return (
            <Button
              key={val.id}
              onClick={onClick(id)}
              className={isActive ? styles.active : ''}
            >
              {val.name}
            </Button>
          );
        })}
      </div>
      <GenreMovies genreId={genreId} genresByIdData={genresByIdData} />
    </div>
  );
};

export default Genre;
