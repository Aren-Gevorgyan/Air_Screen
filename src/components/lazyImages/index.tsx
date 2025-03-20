"use client";

import React, { FC, useState } from "react";
import Image, { ImageProps } from "next/image";
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
    src: string;
    alt: string;
} & Omit<ImageProps, "src" | "alt">;

const LazyImage: FC<Props> = ({ src, alt, ...rest }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={clsx(styles.container, isLoaded ? styles.loaded : '')}>
            {!isLoaded && <div className={styles.placeholder} />}
            <Image
                src={src}
                alt={alt}
                fill
                onLoad={() => setIsLoaded(true)}
                {...rest}
            />
        </div>
    );
};

export default LazyImage;
