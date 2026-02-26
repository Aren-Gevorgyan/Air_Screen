'use client';

import { memo } from 'react';
import Button from '@/components/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './styles.module.scss';
import { deleteItem, fetchMovieById, fetchMoviesByUserId } from '@/requests/firebase';
import { Movies } from '@/assets/types';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '@/components/toast';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Props = {
  id?: string;
  userId?: string | null;
  setLoading: (val: boolean) => void;
  setMovies: (val: Movies[]) => void;
};

const Actions = ({ id, userId, setMovies, setLoading }: Props) => {
  const t = useTranslations('Words');

  const handleDelete = async () => {
    try {
      if (id) {
        const movieData = await fetchMovieById(id);
        await deleteItem(id);
        void fetch('/api/send-telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: id,
            userId: movieData?.userId || userId || undefined,
            name: movieData?.name,
            date: movieData?.date,
            hour: movieData?.hour,
            type: movieData?.type,
            phone: movieData?.phone,
            firstOponent: movieData?.firstOponent,
            secondOponent: movieData?.secondOponent,
            popcornCount: movieData?.popcornCount,
            kalian: movieData?.kalian,
            romanticDinner: movieData?.romanticDinner,
            guestCount: movieData?.guestCount,
            watchType: movieData?.watchType,
            isDeleted: true,
          }),
        });
      }
      showToast(t('success_order_delete'), 'success');
      const res = await fetchMoviesByUserId(userId);
      setMovies((res || []) as Movies[]);
    } catch (err) {
      showToast(t('error_order_delete'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Link href={`/order?id=${id}`} className={styles.edit}>
          <FaEdit />
        </Link>
        <Button onClick={handleDelete} className={styles.delete}>
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

export default memo(Actions);
