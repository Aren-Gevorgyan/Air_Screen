'use client';

import styles from './styles.module.scss';
import Items from '@/pagesComponents/myOrders/items';
import Moon from '@/components/moon';
import { useGuestUserId } from '@/hooks/useGuestUserId';

const MyOrders = () => {
  const userId = useGuestUserId();

  return (
    <div className={styles.container}>
      <Moon />
      <Items userId={userId} />
    </div>
  );
};

export default MyOrders;

