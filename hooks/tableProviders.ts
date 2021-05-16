import { Product, getProductById } from "../firebase/products";
import {
  Table,
  getTableById,
  occupyTable,
  orderByTableId,
  prepareTable,
  readyTable,
  unoccupyTable,
} from "../firebase/tables";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useObservableStateFromFBDocRef } from "./utilities";

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
