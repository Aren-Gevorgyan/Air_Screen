import React, { FC } from 'react';
import WithAuth from '@/hoc/withAuth';
import styles from './styles.module.scss';
import { Link } from '@/i18n/navigation';
import Items from '@/pagesComponents/myLista/items';
import { useTranslations } from 'next-intl';

type Props = {
  searchParams?: Promise<{ auth: boolean }>;
};

const MyLists: FC<Props> = () => {
  const t = useTranslations("Words");

  return (
    <div className={styles.container}>
      <Link href={'/order'} className={styles.registr}>{t('registr')}</Link>
      <Items />
    </div>
  )
};

export default WithAuth(MyLists);
