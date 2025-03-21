import React, { FC } from 'react';
import styles from './styles.module.scss';
import { GenresType } from '@/assets/types';

type Props = {
  genres: Array<GenresType>;
};

const Genres: FC<Props> = ({ genres }) => {
  return (
    <div className={styles.container}>
      {genres?.map(({ name }) => <span key={name}>{name}</span>)}
    </div>
  );
};

export default Genres;
