import React, { FC } from 'react';
import WithAuth from '@/hoc/withAuth';
import styles from './styles.module.scss';
import AddVisitModal from '@/pagesComponents/myLista/addVisitmodal/page';

type Props = {
  searchParams?: Promise<{ auth: boolean }>;
};

const MyLists: FC<Props> = () => {

  return (
    <div className={styles.container}>
      <AddVisitModal />
    </div>
  )
};

export default WithAuth(MyLists);
