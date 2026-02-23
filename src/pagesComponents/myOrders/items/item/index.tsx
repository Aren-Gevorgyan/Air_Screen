'use client';

import { memo } from 'react';
import styles from './styles.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslations } from 'next-intl';

type Props = {
  name: string;
  val?: string | number | boolean | null;
};

const Item = ({ name, val }: Props) => {
  const t = useTranslations('Words');
  console.log('val', val);
  console.log('name', name);
  let displayValue: string | number | boolean;

  if (typeof val === 'boolean') {
    displayValue = val ? '✓' : '✕';
  } else {
    displayValue = val ?? '_';
  }

  return (
    <div className={styles.container}>
      <span>{t(name)} :</span>
      <span>{displayValue}</span>
    </div>
  );
};

export default memo(Item);
