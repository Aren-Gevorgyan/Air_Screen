'use client';

import React, { memo } from 'react';
import styles from './styles.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslations } from 'next-intl';

type Props = {
  name: string;
  val?: string;
};

const Item = ({ name, val }: Props) => {
  const t = useTranslations('Words');

  return (
    <div className={styles.container}>
      <span>{t(name)} :</span>
      <span>{val || '_'}</span>
    </div>
  );
};

export default memo(Item);
