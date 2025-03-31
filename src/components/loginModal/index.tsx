import React, { memo } from "react";
import {
    SignInButton,
    SignUpButton,
} from '@clerk/nextjs';
import styles from './styles.module.scss';

const LoginModal = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <SignInButton mode="modal"/>
                <SignUpButton mode="modal"/>
            </div>
        </div>
    )
}

export default memo(LoginModal);