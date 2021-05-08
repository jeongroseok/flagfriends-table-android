import React, { ReactNode, createContext } from "react";

import { useTableProvider } from "../hooks";

export const TableContext = createContext<ReturnType<typeof useTableProvider>>(
  {} as any
);

type Props = {
  children: ReactNode;
};
function TableProvider({ children }: Props) {
  return (
    <TableContext.Provider value={useTableProvider()}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
