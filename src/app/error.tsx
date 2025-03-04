'use client';
import React from 'react';
import styles from './styles.module.scss';

const Error = ({ error }: { error: Error }) => {
  return (
    <div className={styles.error}>
      <p>Error fetching movie data: {error.message}</p>
    </div>
  );
};

export default Error;
