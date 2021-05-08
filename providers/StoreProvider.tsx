import React, { ReactNode, createContext } from "react";

import { useStoreProvider } from "../hooks";

export const StoreContext = createContext<ReturnType<typeof useStoreProvider>>(
  {} as any
);

type Props = {
  children: ReactNode;
};
function StoreProvider({ children }: Props) {
  return (
    <StoreContext.Provider value={useStoreProvider()}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
