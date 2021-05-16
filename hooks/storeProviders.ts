import { Store, getStoreById } from "../firebase/stores";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useObservableStateFromFBDocRef } from "./utilities";

export function useCurrentStoreId() {
  type StorageType = Store["id"] | undefined;
  const StorageKey = "storeId";
  const { getItem, setItem, removeItem } = useAsyncStorage(StorageKey);
  const [currentStoreId, setCurrentStoreId] = useState<StorageType>();
  const [loading, setLoading] = useState(true);

  const changeCurrentStoreId = useCallback(
    async (id: StorageType) => {
      if (id) await setItem(id);
      else await removeItem();
      setCurrentStoreId(id);
    },
    [setItem, setCurrentStoreId]
  );

  useEffect(() => {
    (async () => {
      setCurrentStoreId((await getItem()) || undefined);
      setLoading(false);
    })();
  }, [getItem]);

  return {
    currentStoreId,
    changeCurrentStoreId,
    loading,
  };
}

export function useStoreProvider() {
  const { currentStoreId, changeCurrentStoreId } = useCurrentStoreId();
  const [store, loading, error] = useObservableStateFromFBDocRef(
    () => getStoreById(currentStoreId!),
    [currentStoreId]
  );

  return useMemo(() => {
    return {
      store: store && {
        ...store,
      },
      error,
      loading,
      changeStore: changeCurrentStoreId,
      // authorized: firestore rules에서 던지는 예외 처리할 것
    };
  }, [store, loading, error]);
}
