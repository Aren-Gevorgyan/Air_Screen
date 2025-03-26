import React, { FC } from 'react';
import styles from './styles.module.scss';
import { IMAGE_URL } from '@/assets/constants';
import Image from 'next/image';
import Moon from '@/components/moon';
import StarRating from '@/components/starRating';
import { getActors, getMovie } from '@/requests/ssr';
import clsx from 'clsx';
import MovieTrailer from '@/components/trailer';
import Info from '@/pagesComponents/movie/info';

type Props = {
  params: Promise<{ id: string }>;
};

const Movie: FC<Props> = async ({ params }) => {
  const id = (await params).id;
  const [movie, actors] = await Promise.all([getMovie(id), getActors(id)]);
  const image = movie.poster_path || movie.backdrop_path;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Moon />
        <div className={styles.info}>
          <div className={styles.imageContainer}>
            <div className={clsx(styles.image, image ? '' : styles.noImage)}>
              {!!image && (
                <Image
                  src={`${IMAGE_URL}/${image}`}
                  alt={`AirScreen ${movie.title}`}
                  fill
                />
              )}
            </div>
            <Info movie={movie} actors={actors} />
          </div>
          <StarRating rating={movie.vote_average} />
          <MovieTrailer movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
