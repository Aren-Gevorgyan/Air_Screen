'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import { fetchSavedMovies, saveMovie, unsave } from '@/requests/firebase';
import { showToast } from '../toast';
import { useTranslations } from 'next-intl';
import { SaveMovie } from '@/assets/types';

const GUEST_USER_ID = 'guest';

type Props = {
  movieId: number;
  className: string;
};

const SaveButton: FC<Props> = ({ movieId, className }) => {
  const t = useTranslations('MyOrders');
  const [data, setData] = useState<SaveMovie>();
  const { state: isSaved, setFalse, setTrue } = useBoolean(false);

  useEffect(() => {
    fetchSavedMovies(GUEST_USER_ID).then((res) => {
      const saved = res?.moviesId?.some((val: number) => val === movieId);
      if (saved) setTrue();
      setData(res);
    });
  }, [movieId, isSaved]);

  const onClick = useCallback(async () => {
    try {
      if (isSaved && data?.userId) {
        await unsave(data.moviesId, movieId, GUEST_USER_ID);
        setFalse();
      } else {
        if (data?.moviesId && data.moviesId.length) {
          await saveMovie([...data.moviesId, movieId], GUEST_USER_ID);
        } else {
          await saveMovie([movieId], GUEST_USER_ID);
        }
        setTrue();
      }
    } catch {
      setFalse();
      showToast(t('saved_error'), 'error');
    }
  }, [movieId, data, isSaved]);

  return (
    <Button className={className} onClick={onClick}>
      {isSaved ? (
        <FaBookmark className="white" size={25} />
      ) : (
        <FaRegBookmark className="black" size={25} />
      )}
    </Button>
  );
};

export default SaveButton;
