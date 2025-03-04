'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.scss';
import Image from 'next/image';
import { MovieData } from '@/assets/types';
import { breakpoints, IMAGE_URL } from '@/assets/constants';

export interface CarouselProps {
  data: MovieData[];
}

const CarouselCom: FC<CarouselProps> = ({ data }) => {
  return (
    <Swiper
      loop
      slidesPerView={8}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={breakpoints}
    >
      {data?.map((val: any) => {
        return (
          <SwiperSlide key={val.id}>
            <Image
              src={`${IMAGE_URL}/${val.poster_path}`}
              alt="AirScreen film"
              fill
            />
            <span>{val?.title || ''}</span>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CarouselCom;
