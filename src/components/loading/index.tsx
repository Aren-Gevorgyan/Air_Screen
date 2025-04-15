import React, { memo } from 'react';

import Image from 'next/image';
import styles from './styles.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src="/gif/loading.gif"
          alt="AirScreen loading"
          unoptimized={true}
          fill
        />
      </div>
    </div>
  );
};

export default memo(Loading);
