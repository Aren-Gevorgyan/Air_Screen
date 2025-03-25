import React, { FC } from 'react';
import styles from './styles.module.scss';
import ArrowLeft from '../../../public/svgs/arrowLeft';
import { Link } from '@/i18n/navigation';

const NotFound: FC<any> = async () => {

  return (
    <div className={styles.notFound}>
      <div>
        <p>The requested page could not be found.</p>
        <Link href={`/`}>
          <ArrowLeft /> Back main page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
