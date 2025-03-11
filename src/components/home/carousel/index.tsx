"use client";

import { IMAGE_URL, responsive } from "@/assets/constants";
import { MovieData } from "@/assets/types";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './styles.module.scss';
import { FC } from "react";

type CarouselProps = {
    data: MovieData[];
}

const MyCarousel: FC<CarouselProps> = ({ data }) => {
    return (
        <div className={styles.carouselContainer}>
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={2000}
                keyBoardControl
                showDots
                arrows
                dotListClass={styles.customDotList}
            >
                {data?.map((val: MovieData, index: number) => {
                    return (
                        <div key={index} className={styles.item}>
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
                    );
                })}
            </Carousel>
        </div>
    );
}

export default MyCarousel;
