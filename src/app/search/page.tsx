'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { debounce } from 'lodash';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { MovieData } from '@/assets/types';
import { SEARCH_MOVIES } from '@/assets/queryKeys';
import { searchMovies } from '@/requests/csr';
import useQueryParam from '@/hooks/useQueryParam';
import Moon from '@/components/moon';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/starRating';
import { IMAGE_URL } from '@/assets/constants';
import clsx from 'clsx';

const Filter = () => {
    const searchValue: string = useQueryParam('value');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');

    useEffect(() => {
        const handler = debounce((value: string) => setDebouncedSearch(value), 300);
        handler(searchValue);
        return () => handler.cancel();
    }, [searchValue]);

    const { data: searchData, isLoading }: UseQueryResult<{ results: MovieData[] }, Error> =
        useQuery({
            queryKey: [SEARCH_MOVIES, debouncedSearch],
            queryFn: () => searchMovies(searchValue),
        });

    const title = searchData && searchData?.results?.length > 1 ? 'Որոնման արդյունքներ' : 'Որոնման արդյունքը';

    return (
        <div className={styles.container}>
            <Moon />
            <h2 className={styles.popular}>{title}</h2>
            {isLoading ?
                <span className={styles.isEmpty}>Loading ...</span>
                :
                searchData?.results?.length ?
                    <div className={styles.itemContainer}>
                        {searchData.results.map((val: MovieData) => {
                            return (
                                <Link href={`/${val.id}`} className={clsx(styles.content, val.poster_path ? "" : styles.noImage)} key={val.id}>
                                    <div className={styles.item}>
                                        {!!val.poster_path && <Image src={`${IMAGE_URL}${val.poster_path}`} alt={`AirScreen ${val.title}`} fill />}
                                    </div>
                                    <div className={styles.description} title='Տեսնել ավելին'>
                                        <h5>{val.title}</h5>
                                        <span>{val.release_date}</span>
                                        <StarRating rating={val.vote_average} />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    :
                    <span className={styles.isEmpty}>Մենք չկարողացանք գտնել որոնված ֆիլմը</span>
            }
        </div>
    );
};

export default Filter;