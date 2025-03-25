'use client'

import React from 'react';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import styles from './styles.module.scss';
import clsx from 'clsx';

const SignInCom = () => {
    const { isSignedIn } = useUser();

    return (
        <div className={clsx(styles.container, isSignedIn ? styles.deleteAnim : '')}>
            <SignedOut>
                <SignInButton mode="modal"/>
                <SignUpButton mode="modal"/>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default SignInCom;