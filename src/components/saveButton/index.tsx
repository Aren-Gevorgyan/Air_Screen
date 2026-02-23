'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import { fetchSavedMovies, saveMovie, unsave } from '@/requests/firebase';
import { showToast } from '../toast';
import { useTranslations } from 'next-intl';
import { SaveMovie } from '@/assets/types';
import { useGuestUserId } from '@/hooks/useGuestUserId';

type Props = {
  movieId: number;
  className: string;
};

const SaveButton: FC<Props> = ({ movieId, className }) => {
  const t = useTranslations('MyOrders');
  const userId = useGuestUserId();
  const [data, setData] = useState<SaveMovie>();
  const { state: isSaved, setFalse, setTrue } = useBoolean(false);

  useEffect(() => {
    if (!userId) return;

    fetchSavedMovies(userId).then((res) => {
      const saved = res?.moviesId?.some((val: number) => val === movieId);
      if (saved) setTrue();
      setData(res);
    });
  }, [movieId, isSaved, userId, setTrue]);

  const onClick = useCallback(async () => {
    if (!userId) return;

    try {
      if (isSaved && data?.userId) {
        await unsave(data.moviesId, movieId, userId);
        setFalse();
      } else {
        if (data?.moviesId && data.moviesId.length) {
          await saveMovie([...data.moviesId, movieId], userId);
        } else {
          await saveMovie([movieId], userId);
        }
        setTrue();
      }
    } catch {
      setFalse();
      showToast(t('saved_error'), 'error');
    }
  }, [movieId, data, isSaved, t, setFalse, setTrue, userId]);

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

