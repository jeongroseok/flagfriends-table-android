import {
  Notification,
  getNotificationById,
  listNotificationsByStoreId,
} from "../firebase/notifications";
import { collectionData, docData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";
import { useObservable, useObservableState } from "observable-hooks";

export type { Notification };

/* Hooks */
export function useNotificationSummariesByStoreId(storeId: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        switchMap(([storeId]) =>
          collectionData<Notification>(
            listNotificationsByStoreId(storeId),
            "id"
          )
        )
      ),
    [storeId]
  );
  return useObservableState(state$) || [];
}

export function useNotificationById(id: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([id]) => getNotificationById(id)),
        switchMap((ref) =>
          docData<Notification>(ref, "id").pipe(
            map((value) => ({ ref, value }))
          )
        )
      ),
    [id]
  );

  const state = useObservableState(state$);
  return state?.value;
}
