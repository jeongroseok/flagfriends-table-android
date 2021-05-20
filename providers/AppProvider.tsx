import { AppContext } from "../hooks";
import React from "react";
import { useAppProvider } from "../hooks";

function AppProvider({ children }: React.Component["props"]) {
  const value = useAppProvider();

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
