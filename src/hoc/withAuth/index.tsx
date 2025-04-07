import { auth } from "@clerk/nextjs/server";
import React, { ComponentType, lazy } from 'react';
import Loadable from "../loadable";

const LoginModal = Loadable(lazy(() => import('@/components/loginModal')));

const WithAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthWrapper = async (props: P) => {
    const { userId } = await auth();

    if (!userId) {
      return <LoginModal />;
    }

    return <Component {...props} />;
  };

  return AuthWrapper
};

export default WithAuth;
