import React from 'react';
import styles from './styles.module.scss';
import { apiKey, BASE_URL, IMAGE_URL } from '@/assets/constants';
import Image from 'next/image';
import Moon from '@/components/moon';
import StarRating from '@/components/starRating';
import Button from '@/components/button';
import SaveButton from '@/components/saveButton';

const Movie = async ({ params }: { params: { id: string } }) => {
    const url = `${BASE_URL}/movie/${params.id}?api_key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const movie = await response.json();
    console.log("TCL: Movie -> movie", movie)

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
                            <div className={styles.buttons}>
                                <Button className={styles.pick}>
                                    Գրանցել
                                </Button>
                                <SaveButton className={styles.save} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.item}>
                            <span>Թողարկման ամսաթիվ</span>
                            <span>{movie.release_date || ''}</span>
                        </div>
                        <div className={styles.item}>
                            <span>Նկարագրություն</span>
                            <span>{movie.overview || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
