import React, { FC, lazy } from 'react';
import { auth } from "@clerk/nextjs/server";
import Loadable from '@/hoc/loadable';

const LoginModal = Loadable(lazy(() => import('@/components/loginModal')));

type Props = {
  searchParams?: Promise<{ auth: boolean }>;
};

const MyLists: FC<Props> = async () => {
  const { userId } = await auth();

  return <div>
    {!userId ? <LoginModal/> : <> </>}
  </div>;
};

export default MyLists;
