'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { debounce, result } from 'lodash';
import { useInfiniteQuery } from '@tanstack/react-query';
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
import Loading from '@/components/loading';
import SeeMore from '@/components/seeMore';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

type NextPageParam = {
  page: number;
  total_pages: number;
  results: Array<MovieData>;
};

const Filter = () => {
  const params = useParams();
  const t = useTranslations('Words');
  const searchValue: string | null = useQueryParam('value');
  const [debouncedSearch, setDebouncedSearch] = useState<string | null>('');

  useEffect(() => {
    const handler = debounce(
      (value: string | null) => setDebouncedSearch(value),
      300
    );
    handler(searchValue);
    return () => handler.cancel();
  }, [searchValue]);

  const {
    data: searchData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [SEARCH_MOVIES, debouncedSearch],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      return await searchMovies(searchValue, pageParam);
    },
    getNextPageParam: (lastPage: NextPageParam) => {
      if (!lastPage?.page) return 1;
      const nextPageNumber = lastPage.page + 1;
      if (nextPageNumber > lastPage.total_pages) return;
      return nextPageNumber;
    },
    initialPageParam: 1,
  });

  const title =
    searchData && searchData?.pages?.[0].results?.length > 1
      ? t('searchResults')
      : t('searchResult');

  return (
    <div className={styles.container}>
      <Moon />
      <h2 className={styles.popular}>{title}</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.itemContainer}>
          {searchData?.pages.map((val: { results: Array<MovieData> }, i: number) => {
            if (!val.results.length) return <span key={i} className={styles.isEmpty}>{t('data_not_found')}</span>
            return val.results.map((val: MovieData) => {
              return (
                <Link
                  href={`/${params.locale}/${val.id}`}
                  className={clsx(
                    styles.content,
                    val.poster_path ? '' : styles.noImage
                  )}
                  key={val.id}
                >
                  <div className={styles.item}>
                    {!!val.poster_path && (
                      <Image
                        src={`${IMAGE_URL}${val.poster_path}`}
                        alt={`AirScreen ${val.title}`}
                        fill
                      />
                    )}
                  </div>
                  <div className={styles.description} title={t('seeMore')}>
                    <h5>{val.title}</h5>
                    <span>{val.release_date}</span>
                    <StarRating rating={val.vote_average} />
                  </div>
                </Link>
              );
            });
          })}
          {isFetchingNextPage && <Loading />}
          {hasNextPage && <SeeMore fetchNextPage={fetchNextPage} />}
        </div>
      )}
    </div>
  );
};

export default Filter;
