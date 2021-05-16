import React, { createContext } from "react";

import { useStoreProvider } from "../hooks/storeProviders";

export const StoreContext = createContext<ReturnType<typeof useStoreProvider>>(
  {} as any
);

function StoreProvider({ children }: React.Component["props"]) {
  const value = useStoreProvider();
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;
