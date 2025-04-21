'use client';

import React, { FC, memo, useEffect, useState } from 'react';
import { Movies } from '@/assets/types';
import { fetchMoviesByUserId } from '@/requests/firebase';
import styles from './styles.module.scss';
import Loading from '@/components/loading';
import { useTranslations } from 'next-intl';
import Actions from './actions';
import { Link } from '@/i18n/navigation';
import { showToast } from '@/components/toast';
import Item from './item';

type Props = {
  userId: string | undefined | null;
};

const Items: FC<Props> = ({ userId }) => {
  const t = useTranslations('Words');
  const [movies, setMovies] = useState<Array<Movies | undefined>>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMoviesByUserId(userId)
      .then((res: Array<Movies | undefined> | undefined) => {
        if (res) setMovies(res);
      })
      .catch(() => {
        showToast(t('get_movie_error'), 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className={styles.container}>
      <Link href={'/order'} className={styles.registr}>
        {t('registr')}
      </Link>
      <div className={styles.content}>
        {isLoading ? (
          <Loading />
        ) : movies?.length ? (
          movies?.map((val: Movies | undefined) => {
            return (
              <div key={val?.name} className={styles.itemContainer}>
                <div className={styles.backgorund} />
                <div className={styles.items}>
                  <Item val={val?.type} name='type' />
                  {val?.type === t('movie') ?
                    <>
                      <Item val={val?.filmId} name='film_id' />
                      <Item val={val?.name} name='film_name' />
                    </>
                    :
                    <Item val={`${val?.firstOponent || '_'} vs ${val?.secondOponent || '_'}`} name='oponents' />
                  }
                  <Item val={`${val?.name} ${val?.hour}`} name='date_watch' />
                  <Item val={val?.phone} name='phone' />
                </div>
                <Actions
                  id={val?.id}
                  setMovies={setMovies}
                  setLoading={setLoading}
                />
              </div>
            );
          })
        ) : (
          <span className={styles.isEmpty}>{t('data_not_found')}</span>
        )}
      </div>
    </div>
  );
};

export default memo(Items);
