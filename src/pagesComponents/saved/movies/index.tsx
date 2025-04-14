import React, { FC } from 'react';
import StarRating from '@/components/starRating';
import Loading from '@/components/loading';
import { Link } from "@/i18n/navigation";

import styles from './styles.module.scss';
import { MovieData } from '@/assets/types';
import clsx from 'clsx';
import { IMAGE_URL } from '@/assets/constants';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  data: Array<MovieData>,
  isLoading: boolean
}

const Movies: FC<Props> = ({ data, isLoading }) => {
  const t = useTranslations('Words');

  return (
    <>
      <h2 className={styles.title}>{t('saved_movies')}</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.itemContainer}>
          {data?.length ?
            data.map((val: MovieData) => {
              return (
                <Link
                  href={`/${val.id}`}
                  className={clsx(
                    styles.content,
                    val.poster_path ? '' : styles.noImage
                  )}
                  key={val.id}
                >
                  <div className={styles.item}>
                    {!!val.poster_path && (
                      <Image
                        src={`${IMAGE_URL}${val.poster_path}`}
                        alt={`AirScreen ${val.title}`}
                        fill
                      />
                    )}
                  </div>
                  <div className={styles.description} title={t('seeMore')}>
                    <h5>{val.title}</h5>
                    <span>{val.release_date}</span>
                    <StarRating rating={val.vote_average} />
                  </div>
                </Link>
              );
            })
            :
            <span className={styles.isEmpty}>{t('data_not_found')}</span>
          }
        </div>
      )}
    </>
  )
}

export default Movies;