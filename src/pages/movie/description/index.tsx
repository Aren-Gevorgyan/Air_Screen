import React, { FC } from 'react'
import styles from './styles.module.scss';
import { MovieData } from '@/assets/types';

type Props = {
    movie: MovieData,
}

const Description: FC<Props> = ({ movie }) => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <span>Ծագման երկիր</span>
                {movie.origin_country.map((val: string) => <span key={val}>{val || ''}</span>)}
            </div>
            <div className={styles.item}>
                <span>Ժամանակը</span>
                <span>{`${movie.runtime}ր.` || ''}</span>
            </div>
            <div className={styles.item}>
                <span>Թողարկման ամսաթիվ</span>
                <span>{movie.release_date || ''}</span>
            </div>
            <div className={styles.item}>
                <span>Նկարագրություն</span>
                <span>{movie.overview || ''}</span>
            </div>
        </div>
    )
}

export default Description