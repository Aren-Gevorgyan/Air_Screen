'use client';

import React, { FC, memo, useEffect, useState } from "react";
import { Movies } from "@/assets/types";
import { fetchMoviesByUserId } from "@/requests/firebase";
import styles from './styles.module.scss';
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";
import Actions from "./actions";
import { Link } from "@/i18n/navigation";
import { showToast } from "@/components/toast";

type Props = {
    userId: string | undefined | null;
}

const Items: FC<Props> = ({ userId }) => {
    const t = useTranslations("Words");
    const [movies, setMovies] = useState<Array<Movies | undefined>>();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMoviesByUserId(userId).then((res: Array<Movies | undefined> | undefined) => {
            if (res) setMovies(res);
        }).catch(() => {
            showToast(t('get_movie_error'), 'error')
        }).finally(() => {
            setLoading(false);
        });
    }, [userId]);

    return (
        <div className={styles.container}>
            <Link href={'/order'} className={styles.registr}>{t('registr')}</Link>
            <div className={styles.content}>
                {isLoading ?
                    <Loading />
                    :
                    movies?.length ?
                        movies?.map((val: Movies | undefined) => {
                            return (
                                <div key={val?.name} className={styles.itemContainer}>
                                    <div className={styles.backgorund} />
                                    <div className={styles.items}>
                                        <div className={styles.item}>
                                            <span>{t('film_id')} :</span>
                                            <span>{val?.filmId || "_"}</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span>{t('film_name')} :</span>
                                            <span>{val?.name}</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span>{t('date_watch')} :</span>
                                            <span>{val?.date} {val?.hour}</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span>{t('phone')} :</span>
                                            <span>{val?.phone}</span>
                                        </div>
                                    </div>
                                    <Actions id={val?.id} setMovies={setMovies} setLoading={setLoading} />
                                </div>
                            )
                        })
                        :
                        <span className={styles.isEmpty}>{t('data_not_found')}</span>}
            </div>
        </div>
    );
}

export default memo(Items);