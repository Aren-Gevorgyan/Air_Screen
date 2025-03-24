import React, { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ArrowLeft from '../../../public/svgs/arrowLeft';

const NotFound: FC<any> = async ({ searchParams }) => {
  const locale = (await searchParams);

  return (
    <div className={styles.notFound}>
      <div>
        <p>The requested page could not be found.</p>
        <Link href={`/${locale}`}>
          <ArrowLeft /> Back main page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
