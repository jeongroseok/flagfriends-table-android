import { AppContext } from "./apps";
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
  return useContext(AppContext).store!;
}
