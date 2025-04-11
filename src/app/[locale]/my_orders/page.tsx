import React, { FC } from 'react';
import WithAuth from '@/hoc/withAuth';
import styles from './styles.module.scss';
import Items from '@/pagesComponents/myOrders/items';
import { auth } from '@clerk/nextjs/server';

type Props = {
  searchParams: Promise<{ auth: boolean, userId: string }>;
};

const MyOrders: FC<Props> = async () => {
  const { userId } = await auth();

  return (
    <div className={styles.container}>
      <Items userId={userId}/>
    </div>
  )
};

export default WithAuth(MyOrders);
