'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { debounce } from 'lodash';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { MovieData } from '@/assets/types';
import { SEARCH_MOVIES } from '@/assets/queryKeys';
import { searchMovies } from '@/requests/seacrh';
import useQueryParam from '@/hooks/useQueryParam';
import Moon from '@/components/moon';
import MyCarousel from '@/components/carousel';

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
                    <MyCarousel data={searchData?.results || []} />
                    :
                    <span className={styles.isEmpty}>Մենք չկարողացանք գտնել որոնված ֆիլմը</span>
            }
        </div>
    );
};

export default Filter;