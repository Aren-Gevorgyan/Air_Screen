'use client';

import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { MovieData } from '@/assets/types';
import { breakpoints, IMAGE_URL } from '@/assets/constants';
import styles from './styles.module.scss';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SEARCH_MOVIES } from '@/assets/queryKeys';
import { searchMovies } from '@/requests/seacrh';
import { debounce } from 'lodash';
import useQueryParam from '@/hooks/useQueryParam';

export interface CarouselProps {
  data: MovieData[];
}

const CarouselCom: FC<CarouselProps> = ({ data }) => {
  const filterQuery = useQueryParam('filter');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  useEffect(() => {
    const handler = debounce((value: string) => setDebouncedSearch(value), 300);
    handler(filterQuery);
    return () => handler.cancel();
  }, [filterQuery]);

  const { data: searchData }: UseQueryResult<{ results: MovieData[] }, Error> =
    useQuery({
      queryKey: [SEARCH_MOVIES, debouncedSearch],
      queryFn: () => searchMovies(filterQuery),
    });

  const moviesData = searchData?.results?.length ? searchData?.results : data;

  return (
    <Swiper
      loop
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={breakpoints}
    >
      {moviesData?.map((val: MovieData, index: number) => {
        return (
          <SwiperSlide key={index}>
            <div className={styles.item}>
              <Image
                src={`${IMAGE_URL}/${val.poster_path}`}
                alt={`AirScreen ${val.title} image`}
                fill
              />
              <div className={styles.opacity}>
                <span className={styles.title}>{val?.title || ''}</span>
                <span className={styles.overview}>{val?.overview || ''}</span>
                <span className={styles.date}>{val?.release_date || ''}</span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CarouselCom;
