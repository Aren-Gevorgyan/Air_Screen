import React, { ComponentType, Suspense } from "react";

const Loadable = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;