import {
  Table,
  Occupation as TableOccupation,
  Order as TableOrder,
  listTablesByStoreId,
  occupyTable,
  orderByTableId,
  prepareTable,
  readyTable,
  unoccupyTable,
} from "../firebase/tables";
import { map, switchMap } from "rxjs/operators";
import { useContext, useMemo } from "react";
import { useObservable, useObservableState } from "observable-hooks";

import { AppContext } from "./apps";
import { Product } from "./products";
import { getProductById } from "../firebase/products";
import { snapToData } from "rxfire/firestore";
import { useObservableStateFromFBColRef } from "./utilities";

export type { Table, TableOccupation, TableOrder };

export function useTable() {
  const { table } = useContext(AppContext);
  return useMemo(() => {
    const ready = async () => await readyTable({ id: table!.id });
    const prepare = async () => await prepareTable({ id: table!.id });
    const occupy = async () => await occupyTable({ id: table!.id });
    const unoccupy = async () => await unoccupyTable({ id: table!.id });
    const pay = async () => {};
    const order = async (
      orderItems: Omit<TableOrder, "createdAt" | "status">[]
    ) => {
      await orderByTableId(table!.id, orderItems);
    };

    return {
      ...table!,
      ready,
      prepare,
      occupy,
      unoccupy,
      pay,
      order,
    };
  }, [table]);
}

export function useAllTableSummariesByStoreId(storeId: string) {
  const [tableSummaries, loading, error] = useObservableStateFromFBColRef(
    () => listTablesByStoreId(storeId),
    [storeId]
  );
  return { tableSummaries, loading, error };
}

export function useTableOrdersFromTable(table: Table) {
  return useMemo(
    () =>
      table.occupation
        ? Object.entries(table.occupation.orders).map(([id, obj]) => ({
            id,
            ...obj,
          }))
        : [],
    [table.occupation]
  );
}

export function useTotalPriceFromTable(table: Table, currencyCode: string) {
  const orders = useTableOrdersFromTable(table);
  const totalPrice$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([orders]) =>
          orders.filter(({ status }) => status !== "CANCELLED")
        ),
        switchMap(async (orders) => {
          const productSnapshots = await Promise.all(
            orders.map(({ productId }) => getProductById(productId).get())
          );
          const products = productSnapshots.map(
            (s) => snapToData(s, "id") as Product
          );
          return products.reduce(
            (totalPrice, { price }) => totalPrice + price[currencyCode],
            0
          );
        })
      ),
    [orders]
  );

  return useObservableState(totalPrice$, 0);
}
