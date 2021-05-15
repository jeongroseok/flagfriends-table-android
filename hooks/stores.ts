import { Store, getStoreById, listStores } from "../firebase/stores";
import { collectionData, docData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useObservable, useObservableState } from "observable-hooks";
import {
  useObservableStateFromFBColRef,
  useObservableStateFromFBDocRef,
} from "./utilities";

import { StoreContext } from "../providers/StoreProvider";
import { of } from "rxjs";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export type { Store } from "../firebase/stores";

export function useStoreSummaries() {
  const [storeSummaries, loading, error] = useObservableStateFromFBColRef(
    () => listStores(),
    []
  );
  return { storeSummaries, loading, error };
}

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
      changeStore: (id: string | undefined) => changeCurrentStoreId(id),
      // authorized: firestore rules에서 던지는 예외 처리할 것
    };
  }, [store, loading, error]);
}

export function useStore() {
  const { store } = useContext(StoreContext);
  return store!;
}

export function useStoreSelector() {
  const { store, error, loading, changeStore } = useContext(StoreContext);
  return {
    store,
    error,
    loading,
    changeStore,
  };
}
