"use client";

import { IMAGE_URL, responsive } from "@/assets/constants";
import { MovieData } from "@/assets/types";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './styles.module.scss';
import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";

type CarouselProps = {
    data: MovieData[];
}

const MyCarousel: FC<CarouselProps> = ({ data }) => {
    return (
        <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={4000}
            keyBoardControl
            showDots
            arrows
        >
            {data?.map((val: MovieData) => {
                const img = val.poster_path ? `${IMAGE_URL}${val.poster_path}` : '/images/no-image.png';
                return (
                    <div key={val.id} className={clsx(styles.item, val.poster_path ? '' : styles.noImage)}>
                        <Link href={`/${val.id}`} >
                            {!!val.poster_path && <Image
                                src={img}
                                alt={`AirScreen ${val.title} image`}
                                fill
                            />}
                            <div className={styles.opacity}>
                                <span className={styles.title}>{val?.title || ''}</span>
                                <span className={styles.overview}>{val?.overview || ''}</span>
                                <span className={styles.date}>{val?.release_date || ''}</span>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </Carousel>
    );
}

export default MyCarousel;
