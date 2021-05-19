import {
  Banner,
  getBannerById,
  listBannersByStoreId,
} from "../firebase/banners";
import { collectionData, docData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";
import { useObservable, useObservableState } from "observable-hooks";

export type { Banner };

/* Hooks */
export function useBannerSummariesByStoreId(storeId: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        switchMap(([storeId]) =>
          collectionData<Banner>(listBannersByStoreId(storeId), "id")
        )
      ),
    [storeId]
  );
  return useObservableState(state$) || [];
}

export function useBannerById(id: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([id]) => getBannerById(id)),
        switchMap((ref) =>
          docData<Banner>(ref, "id").pipe(map((value) => ({ ref, value })))
        )
      ),
    [id]
  );

  const state = useObservableState(state$);
  return state?.value;
}
