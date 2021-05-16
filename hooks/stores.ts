import { StoreContext } from "../providers/StoreProvider";
import { listStores } from "../firebase/stores";
import { useContext } from "react";
import { useObservableStateFromFBColRef } from "./utilities";

export type { Store } from "../firebase/stores";

export function useStoreSummaries() {
  const [storeSummaries, loading, error] = useObservableStateFromFBColRef(
    () => listStores(),
    []
  );
  return { storeSummaries, loading, error };
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
