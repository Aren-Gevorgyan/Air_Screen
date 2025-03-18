import React, { Suspense, ComponentType, FC } from 'react';

const Loadable = <P extends object>(Component: ComponentType<P>): FC<P> => {
  return (props: P) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
