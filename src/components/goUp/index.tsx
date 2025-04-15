'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './styles.module.scss';
import Button from '../button';

const GoUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    isVisible && (
      <Button className={styles.container} onClick={onClick}>
        <FaArrowUp />
      </Button>
    )
  );
};

export default memo(GoUp);
