'use clinet';

import React, { ComponentType } from 'react';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import styles from './styles.module.scss';

const SignInWrapper = <P extends object>(Component: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const { userId } = useAuth();

    if (!userId) {
      return (
        <div className={styles.container}>
          <SignInButton mode="modal" />
          <Component {...props} />
        </div>
      );
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default SignInWrapper;
