import React, { ReactNode, createContext } from "react";

import { useStoreProvider } from "../hooks";

export const StoreContext = createContext<ReturnType<typeof useStoreProvider>>(
  {} as any
);

type Props = {
  children: ReactNode;
};
function StoreProvider({ children }: Props) {
  const value = useStoreProvider();
  console.log(`StoreProvider: ${JSON.stringify(value)}`);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;
