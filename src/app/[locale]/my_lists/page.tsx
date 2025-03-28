import React, { FC } from 'react';

type Props = {
  searchParams: Promise<{ auth: boolean }>;
};

const MyLists: FC<Props> = async ({ searchParams }) => {
  const auth = (await searchParams).auth;
  return <div>
    jklj;lk;l
  </div>;
};

export default MyLists;
