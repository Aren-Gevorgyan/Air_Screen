import React from 'react';
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

const Movie = async ({ params }: { params: { id: string } }) => {
    const [movie, actors] = await Promise.all([getMovie(params.id), getActors(params.id)])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Moon />
                <div className={styles.info}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <Image src={`${IMAGE_URL}/${movie.backdrop_path}`} alt={`AirScreen ${movie.title}`} fill />
                        </div>
                        <div className={styles.impotentInfo}>
                            <div>
                                <span className={styles.title}>{movie.title || ''}</span>
                                <StarRating rating={movie.vote_average} />
                            </div>
                            <Actors actors={actors.cast} />
                            <div className={styles.buttons}>
                                <Button className={styles.pick}>
                                    Գրանցել
                                </Button>
                                <SaveButton className={styles.save} />
                            </div>
                            {movie?.genres?.length && <Genres genres={movie.genres} />}

                        </div>
                    </div>
                    <Description movie={movie} />
                </div>
            </div>
        </div>
    );
};

export default Movie;
