'use client';

import { FC } from 'react';
import Loading from '../loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMovieTrailer } from '@/requests/csr';
import { MOVIE_TRAILER } from '@/assets/queryKeys';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import useIsIosInAppBrowser from '@/hooks/useIsIosInAppBrowser';

type Props = { movieId: string };

const MovieTrailer: FC<Props> = ({ movieId }) => {
  const t = useTranslations('Words');
  const isIosInAppBrowser = useIsIosInAppBrowser();
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData([MOVIE_TRAILER, movieId]);
  const {
    data: trailerUrl,
    isLoading,
    error,
  } = useQuery({
    queryKey: [MOVIE_TRAILER, movieId],
    queryFn: () => fetchMovieTrailer(movieId),
    enabled: !!movieId,
    initialData: cachedData,
  });

  if (isLoading) return <Loading />;
  if (error) return <span>Error loading trailer</span>;

  const watchUrl = String(trailerUrl || '').replace('/embed/', '/watch?v=');

  return (
    <div className={styles.container}>
      <div className={styles.trailer}>
        <h4>{t('thriller')}</h4>
        {isIosInAppBrowser ? (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.openTrailer}
          >
            {t('seeMore')}
          </a>
        ) : (
          <iframe
            width="100%"
            height="400"
            src={String(trailerUrl)}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default MovieTrailer;
