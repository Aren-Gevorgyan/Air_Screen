"use client";

import { useState } from "react";
import Image from "next/image";
import styles from './styles.module.scss';
import clsx from 'clsx';

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={styles.container}>
            {!isLoaded && <div className={styles.placeholder} />}
            <Image
                src={src}
                alt={alt}
                fill
                className={clsx(styles.lazy_image, isLoaded ? styles.loaded : '')}
                onLoadingComplete={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default LazyImage;
