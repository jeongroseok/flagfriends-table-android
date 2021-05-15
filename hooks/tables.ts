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
import {
  useObservableStateFromFBColRef,
  useObservableStateFromFBDocRef,
} from "./utilities";

import { TableContext } from "../providers/TableProvider";
import { of } from "rxjs";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export type { Table, TableOccupation, TableOrder };

export function useCurrentTableId() {
  type StorageType = Table["id"] | undefined;
  const StorageKey = "tableId";
  const { getItem, setItem, removeItem } = useAsyncStorage(StorageKey);
  const [currentTableId, setCurrentTableId] = useState<StorageType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setCurrentTableId((await getItem()) || undefined);
      setLoading(false);
    })();
  }, [getItem, setCurrentTableId]);

  const changeCurrentTableId = useCallback(
    async (id: StorageType) => {
      if (id) await setItem(id);
      else await removeItem();
      setCurrentTableId(id);
    },
    [setItem, setCurrentTableId]
  );

  return {
    currentTableId,
    changeCurrentTableId,
    loading,
  };
}

export function useTableProvider() {
  const {
    currentTableId,
    changeCurrentTableId,
    loading: idLoading,
  } = useCurrentTableId();
  const [table, loading, error] = useObservableStateFromFBDocRef(
    () => getTableById(currentTableId!),
    [currentTableId]
  );

  return useMemo(() => {
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
      table: table && {
        ...table,
        ready: () => readyTable(table!),
        prepare: () => prepareTable(table!),
        occupy: () => occupyTable(table!),
        unoccupy: () => unoccupyTable(table!),
        order,
      },
      loading: idLoading && loading,
      error,
      changeTable: changeCurrentTableId,
    };
  }, [table, currentTableId, loading, error]);
}

export function useTable() {
  const { table } = useContext(TableContext);
  return table!;
}

export function useTableSelector() {
  return useContext(TableContext);
}

export function useAllTableSummariesByStoreId(storeId: string) {
  const [tableSummaries, loading, error] = useObservableStateFromFBColRef(
    () => listTablesByStoreId(storeId),
    [storeId]
  );
  return { tableSummaries, loading, error };
}
