'use client';

import { memo, useEffect, useState } from "react";
import { Movies } from "@/assets/types";
import { fetchUsers } from "@/requests/csr";
import styles from './styles.module.scss';
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

const Items = () => {
    const t = useTranslations("Words");
    const [movies, setMovies] = useState<Array<Movies>>();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUsers().then((res: Array<Movies> | undefined) => {
            if (res) setMovies(res);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className={styles.container}>
            {isLoading ?
                <Loading />
                :
                movies?.length ?
                    movies?.map((val: Movies) => {
                        return (
                            <div key={val.name} className={styles.item}>
                                <span>{val.id}</span>
                                <span>{val.name}</span>
                                <span>{val.date} {val.hour}</span>
                            </div>
                        )
                    })
                    :
                    <span className={styles.isEmpty}>{t('data_not_found')}</span>}
        </div>
    );
}

export default memo(Items);