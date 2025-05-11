import React from 'react';
import WithAuth from '@/hoc/withAuth';
import styles from './styles.module.scss';
import Items from '@/pagesComponents/myOrders/items';
import { auth } from '@clerk/nextjs/server';
import Moon from '@/components/moon';

const MyOrders = async () => {
  const { userId } = await auth();

  return (
    <div className={styles.container}>
      <Moon />
      <Items userId={userId} />
    </div>
  );
};

export default WithAuth(MyOrders);
