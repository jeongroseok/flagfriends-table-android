import { Product, getProductById } from "../firebase/products";
import {
  Table,
  Occupation as TableOccupation,
  Order as TableOrder,
  getTableById,
  listTablesByStoreId,
  occupyTable,
  orderByTableId,
  prepareTable,
  readyTable,
  unoccupyTable,
} from "../firebase/tables";
import { collectionData, docData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useObservable, useObservableState } from "observable-hooks";

import { TableContext } from "../providers/TableProvider";
import { of } from "rxjs";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export type { Table, TableOccupation, TableOrder };

export function useCurrentTableId() {
  type StorageType = Table["id"] | undefined;
  const StorageKey = "tableId";
  const { getItem, setItem, removeItem } = useAsyncStorage(StorageKey);
  const [currentTableId, setCurrentTableId] = useState<StorageType>();

  const changeCurrentTableId = useCallback(
    async (id: StorageType) => {
      if (id) await setItem(id);
      else await removeItem();
      setCurrentTableId(id);
    },
    [setItem, setCurrentTableId]
  );

  useEffect(() => {
    (async () => {
      setCurrentTableId((await getItem()) || undefined);
    })();
  }, [getItem]);

  return {
    currentTableId,
    changeCurrentTableId,
  };
}

export function useTable() {
  return useContext(TableContext)!;
}

export function useTableProvider() {
  const { currentTableId, changeCurrentTableId } = useCurrentTableId();

  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([id]) => {
          if (id) return getTableById(id);
          return undefined;
        }),
        switchMap((tableRef) => {
          if (tableRef)
            return docData<Table>(tableRef, "id").pipe(
              map((table) => ({ tableRef, table }))
            );
          return of(undefined);
        })
      ),
    [currentTableId]
  );

  const state = useObservableState(state$);

  return useMemo(() => {
    const table = state?.table;

    const order = async (
      productId: Product["id"],
      optionSelections: {
        [optionId: string]: { [selectionId: string]: boolean };
      }
    ) => {
      const product = (await getProductById(productId).get()).data() as Product;

      await orderByTableId(table!.id, {
        product: {
          id: productId,
          price: product.price,
          optionSelections: optionSelections,
        },
        discounts: [],
      });
    };

    return {
      table: state?.table && {
        ...state.table,
        ready: () => readyTable(table!),
        prepare: () => prepareTable(table!),
        occupy: () => occupyTable(table!),
        unoccupy: () => unoccupyTable(table!),
        order,
      },
      loading: currentTableId && !state,
      changeTable: (table: Pick<Table, "id">) => changeCurrentTableId(table.id),
    };
  }, [state]);
}

export function useAllTableSummariesByStoreId(storeId: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        switchMap(([storeId]) =>
          collectionData<Table>(listTablesByStoreId(storeId), "id")
        )
      ),
    [storeId]
  );
  return useObservableState(state$) || [];
}
