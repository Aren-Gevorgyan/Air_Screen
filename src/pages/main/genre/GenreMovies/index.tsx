'use client';

import React, { FC } from 'react'
import styles from './styles.module.scss';
import { MovieData } from '@/assets/types';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from '@/requests/csr';
import { MOVIES_BY_GENRE } from '@/assets/queryKeys';
import { IMAGE_URL, responsive } from '@/assets/constants';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/starRating';
import Carousel from 'react-multi-carousel';

type Props = {
    genreId: string | undefined,
    genresByIdData: Array<MovieData>,
}

const GenreMovies: FC<Props> = ({ genreId, genresByIdData }) => {
    const { data, isLoading } = useQuery({
        queryKey: [MOVIES_BY_GENRE, genreId],
        queryFn: () => fetchMoviesByGenre(genreId),
        enabled: !!genreId,
    });

    const genresData: Array<MovieData> = data ? data : genresByIdData;

    return (
        <div className={styles.container}>
            {isLoading ? <span>Loading...</span> :
                genresData.length ?
                    <Carousel
                        responsive={responsive}
                        infinite
                        autoPlay
                        autoPlaySpeed={4000}
                        keyBoardControl
                        showDots
                        arrows
                    >
                        {genresData.map((val: MovieData) => (
                            <Link href={`/${val.id}`} className={styles.content} key={val.id}>
                                <div className={styles.item}>
                                    {val.poster_path && <Image src={`${IMAGE_URL}${val.poster_path}`} alt={`AirScreen ${val.title}`} fill />}
                                </div>
                                <div className={styles.description}>
                                    <h5>{val.title}</h5>
                                    <span>{val.release_date}</span>
                                    <StarRating rating={val.vote_average} />
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                    :
                    <span className={styles.isEmpty}>Տվյալները չեն գտնվել</span>
            }
        </div>
    )
}

export default GenreMovies