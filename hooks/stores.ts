import { Store, getStoreById, listStores } from "../firebase/stores";
import { collectionData, docData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useObservable, useObservableState } from "observable-hooks";

import { StoreContext } from "../providers/StoreProvider";
import { of } from "rxjs";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export type { Store } from "../firebase/stores";

export function useAllStoreSummaries() {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(switchMap(() => collectionData<Store>(listStores(), "id"))),
    []
  );
  return useObservableState(state$) || [];
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
  const { currentStoreId, changeCurrentStoreId, loading } = useCurrentStoreId();

  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([id]) => {
          if (id) return getStoreById(id);
          return undefined;
        }),
        switchMap((storeRef) => {
          if (storeRef)
            return docData<Store>(storeRef, "id").pipe(
              map((store) => ({ storeRef, store }))
            );
          return of(undefined);
        })
      ),
    [currentStoreId]
  );

  const state = useObservableState(state$);

  return useMemo(() => {
    return {
      store: state?.store && {
        ...state.store,
      },
      loading: (currentStoreId && !state) || loading,
      changeStore: (store: Pick<Store, "id">) => changeCurrentStoreId(store.id),
      // authorized: firestore rules에서 던지는 예외 처리할 것
    };
  }, [state, currentStoreId, loading]);
}

export function useStore() {
  return useContext(StoreContext)!;
}
