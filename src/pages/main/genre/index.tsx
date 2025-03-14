'use client';

import React, { FC, useCallback, useState } from 'react'
import styles from './styles.module.scss';
import { GenresType, MovieData } from '@/assets/types';
import Button from '@/components/button';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from '@/requests/csr';
import { MOVIES_BY_GENRE } from '@/assets/queryKeys';
import { IMAGE_URL, responsive } from '@/assets/constants';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/starRating';
import Carousel from 'react-multi-carousel';

type Props = {
    genres: Array<GenresType>,
}

const Genre: FC<Props> = ({ genres }) => {
    const [genreId, setGenreId] = useState<number>(genres[0].id);
    const { data, isLoading } = useQuery({
        queryKey: [MOVIES_BY_GENRE, genreId],
        queryFn: () => fetchMoviesByGenre(genreId)
    },
    );

    const onClick = useCallback((genreId: number) => () => {
        setGenreId(genreId);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.genres}>
                {genres.map((val: GenresType) =>
                    <Button key={val.id} onClick={onClick(val.id)} className={genreId === val.id ? styles.active : ''}>{val.name}</Button>
                )}
            </div>
            <div className={styles.itemContainer}>
                {isLoading ? <span>Loading...</span> :
                    data.length ?
                        <Carousel
                            responsive={responsive}
                            infinite
                            autoPlay
                            autoPlaySpeed={4000}
                            keyBoardControl
                            showDots
                            arrows
                        >
                            {data.map((val: MovieData) => (
                                <Link href={`/${val.id}`} className={styles.content} key={val.id}>
                                    <div className={styles.item}>
                                        <Image src={`${IMAGE_URL}${val.poster_path}`} alt={`AirScreen ${val.title}`} fill />
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
                        <span>Տվյալները չեն գտնվել</span>
                }
            </div>
        </div>
    )
}

export default Genre