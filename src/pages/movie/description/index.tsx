import React, { FC, lazy } from 'react'
import styles from './styles.module.scss';
import { MovieData } from '@/assets/types';
import Loadable from '@/hoc/loadable';
import { useTranslations } from 'next-intl';

const Companies = Loadable(lazy(() => import('../companies')));

type Props = {
    movie: MovieData,
}

const Description: FC<Props> = ({ movie }) => {
    const t = useTranslations("Words");
    const isLastItem = (i: number) => movie.origin_country.length - 1 === i
    const country = movie.origin_country.length > 1 ? t('countries') : t('country');

    return (
        <div className={styles.container}>
            {!!movie.origin_country.length && <div className={styles.item}>
                <h4>{country}</h4>
                {movie.origin_country.map((val: string, index: number) =>
                    <span key={val}>{`${val}${isLastItem(index) ? '' : ','}` || ''}</span>
                )}
            </div>}
            {!!movie.runtime && <div className={styles.item}>
                <h4>{t('time')}</h4>
                <span>{movie.runtime ? `${movie.runtime}ր.` : ''}</span>
            </div>}
            {!!movie.release_date && <div className={styles.item}>
                <h4>{t('date')}</h4>
                <span>{movie.release_date || ''}</span>
            </div>}
            {!!movie?.production_companies?.length && <Companies companies={movie.production_companies} />}
            {!!movie.overview && <div className={styles.item}>
                <h4>{t('desc')}</h4>
                <span>{movie.overview || ''}</span>
            </div>}
        </div>
    )
}

export default Description