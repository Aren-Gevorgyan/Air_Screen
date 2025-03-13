import React, { FC } from 'react'
import styles from './styles.module.scss';
import { MovieData } from '@/assets/types';
import Companies from '../companies';

type Props = {
    movie: MovieData,
}

const Description: FC<Props> = ({ movie }) => {
    const isLastItem = (i: number) => movie.origin_country.length - 1 === i
    const country = movie.origin_country.length > 1 ? 'Ծագման երկրները' : 'Ծագման երկիր';

    return (
        <div className={styles.container}>
            {!!movie.origin_country.length && <div className={styles.item}>
                <h4>{country}</h4>
                {movie.origin_country.map((val: string, index: number) =>
                    <span key={val}>{`${val}${isLastItem(index) ? '' : ','}` || ''}</span>
                )}
            </div>}
            {!!movie.runtime && <div className={styles.item}>
                <h4>Ժամանակը</h4>
                <span>{`${movie.runtime}ր.` || ''}</span>
            </div>}
            {!!movie.release_date && <div className={styles.item}>
                <h4>Թողարկման ամսաթիվ</h4>
                <span>{movie.release_date || ''}</span>
            </div>}
            <Companies companies={movie.production_companies} />
            {!!movie.overview && <div className={styles.item}>
                <h4>Նկարագրություն</h4>
                <span>{movie.overview || ''}</span>
            </div>}
        </div>
    )
}

export default Description