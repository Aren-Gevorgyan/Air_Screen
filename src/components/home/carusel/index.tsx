'use client';

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { MovieData } from '@/assets/types';
import { breakpoints, IMAGE_URL } from '@/assets/constants';
import styles from './styles.module.scss';

export interface CarouselProps {
  data: MovieData[];
}

const CarouselCom: FC<CarouselProps> = ({ data }) => {

  return (
    <Swiper
      loop
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 30000 }}
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={breakpoints}
    >
      {data?.map((val: MovieData) => {
        return (
          <SwiperSlide key={val.id}>
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
