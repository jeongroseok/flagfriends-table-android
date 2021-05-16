import React, { createContext } from "react";

import { useTableProvider } from "../hooks/tableProviders";

export const TableContext = createContext<ReturnType<typeof useTableProvider>>(
  {} as any
);

function TableProvider({ children }: React.Component["props"]) {
  const value = useTableProvider();
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export default TableProvider;
