import React, { Suspense, ComponentType, FC } from 'react';

const Loadable = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const WrappedComponent: FC<P> = (props: P) => (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

  // Setting the displayName of the wrapped component
  WrappedComponent.displayName = `Loadable(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

export default Loadable;
