"use client";

import React, { FC } from "react";
import Loading from "../loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovieTrailer } from "@/requests/csr";
import { MOVIE_TRAILER } from "@/assets/queryKeys";
import styles from './styles.module.scss';

type Props = { movieId: string, };

const MovieTrailer: FC<Props> = ({ movieId }) => {
    const queryClient = useQueryClient();
    const cachedData = queryClient.getQueryData([MOVIE_TRAILER, movieId])
    const { data: trailerUrl, isLoading, error } = useQuery({
        queryKey: [MOVIE_TRAILER, movieId],
        queryFn: () => fetchMovieTrailer(movieId),
        enabled: !!movieId,
        initialData: cachedData,
    });

    if (isLoading) return <Loading />;
    if (error) return <span>Error loading trailer</span>;

    return (
        <div className={styles.container}>
            {trailerUrl ? (
                <div className={styles.trailer}>
                    <h4>Հոլովակ</h4>
                    <iframe
                        width="100%"
                        height="400"
                        src={String(trailerUrl)}
                        title="Movie Trailer"
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            ) : (
                <h4>Հոլովակը հասանելի չէ։</h4>
            )}
        </div>
    );
}

export default MovieTrailer;
