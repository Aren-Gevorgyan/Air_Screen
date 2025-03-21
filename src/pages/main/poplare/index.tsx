import React, { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import MyCarousel from '@/components/carousel';
import { GenresType, MovieData } from '@/assets/types';
import { useTranslations } from 'next-intl';

type Props = {
  data: {
    popular: Array<MovieData>;
    genres: Array<GenresType>;
    genresByIdData: Array<MovieData>;
  };
};

const Popular: FC<Props> = ({ data }) => {
  const t = useTranslations('Words');

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.about}>
          <h1>
            AirScreen <span>{t('title')}</span>
          </h1>
          <p>{t('description')}</p>
          <p>
            {t('descTwo')} 🌟{' '}
            <span className={styles.airScreen}> AirScreen</span> -{' '}
            {t('descThree')}
          </p>
        </div>
        <div className={styles.images}>
          <Image priority src="/images/pngegg.png" alt="AirScreen hero" fill />
          <Image src="/images/heroThree.png" alt="AirScreen hero" fill />
        </div>
      </div>
      <div className={styles.films}>
        <h2 className={styles.popular}>{t('popular')}</h2>
        <MyCarousel data={data.popular} />
      </div>
    </div>
  );
};

export default Popular;
