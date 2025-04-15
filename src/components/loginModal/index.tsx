import React, { memo } from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

const LoginModal = () => {
  const t = useTranslations('Words');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{t('login_worning')}</p>
        <div>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </div>
      </div>
    </div>
  );
};

export default memo(LoginModal);
