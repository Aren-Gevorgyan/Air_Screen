'use client';

import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import { fetchSavedMovies, saveMovie, unsave } from '@/requests/firebase';
import { useAuth } from "@clerk/clerk-react";
import { showToast } from '../toast';
import { useTranslations } from 'next-intl';
import { SaveMovie } from '@/assets/types';

type Props = {
  movieId: number;
  className: string;
};

const SaveButton: FC<Props> = ({ movieId, className }) => {
  const auth = useAuth();
  const t = useTranslations('MyOrders');
  const [data, setData] = useState<SaveMovie>()
  const { state: isSaved, setFalse, setTrue } = useBoolean(false);

  useEffect(() => {
    fetchSavedMovies(auth.userId).then(res => {
      const isSaved = res?.moviesId?.some((val: number) => val === movieId);
      if (isSaved) setTrue();
      setData(res);
    })
  }, [auth.userId, movieId, isSaved]);

  const onClick = useCallback(async () => {
    try {
      if (isSaved && data?.userId) {
        await unsave(data.moviesId, movieId, auth.userId);
        setFalse();
      } else {
        if (data?.moviesId && data.moviesId.length) {
          await saveMovie([...data.moviesId, movieId], auth.userId);
        } else {
          await saveMovie([movieId], auth.userId);
        }
        setTrue();
      }
    } catch (error) {
      console.log("🚀 ~ onClick ~ error:", error)
      setFalse();
      showToast(t('saved_error'), 'error');
    }
  }, [movieId, auth.userId, data]);

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

export default memo(SaveButton);
