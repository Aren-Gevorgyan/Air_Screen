import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

const SignInCom = () => {
    return (
        <div className={clsx(styles.container, isSignedIn ? styles.deleteAnim : '')}>
            sign in
        </div>
    )
}

export default SignInCom;