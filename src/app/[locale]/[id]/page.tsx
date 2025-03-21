import React, { FC } from 'react';
import styles from './styles.module.scss';
import { IMAGE_URL } from '@/assets/constants';
import Image from 'next/image';
import Moon from '@/components/moon';
import StarRating from '@/components/starRating';
import Button from '@/components/button';
import SaveButton from '@/components/saveButton';
import Description from '@/pages/movie/description';
import { getActors, getMovie } from '@/requests/ssr';
import Genres from '@/pages/movie/genres';
import Actors from '@/pages/movie/actors';
import clsx from 'clsx';
import MovieTrailer from '@/components/trailer';

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
            <div className={styles.impotentInfo}>
              <span className={styles.title}>{movie.title || ''}</span>
              <Actors actors={actors.cast} />
              <div className={styles.buttons}>
                <Button className={styles.pick}>Գրանցել</Button>
                <SaveButton className={styles.save} />
              </div>
              {movie?.genres?.length && <Genres genres={movie.genres} />}
              <Description movie={movie} />
            </div>
          </div>
          <StarRating rating={movie.vote_average} />
          <MovieTrailer movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
