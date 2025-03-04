'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.scss';
import Image from 'next/image';
import { IMAGE_URL } from '@/assets/constants';
import { MovieData } from '@/assets/types';

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
      breakpoints={{
        320: { slidesPerView: 1 }, // Mobile
        480: { slidesPerView: 2 }, // Small tablets
        768: { slidesPerView: 3 }, // Tablets
        1024: { slidesPerView: 4 }, // Laptops
        1280: { slidesPerView: 5 }, // Laptops
        1680: { slidesPerView: 7 }, // Desktops
      }}
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
        )
      })}
    </Swiper>
  );
}

export default CarouselCom;