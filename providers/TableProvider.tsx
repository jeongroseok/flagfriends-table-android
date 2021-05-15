import React, { ReactNode, createContext } from "react";

import { useTableProvider } from "../hooks";

export const TableContext = createContext<ReturnType<typeof useTableProvider>>(
  {} as any
);

type Props = {
  children: ReactNode;
};
function TableProvider({ children }: Props) {
  const value = useTableProvider();
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export default TableProvider;
