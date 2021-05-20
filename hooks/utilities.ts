import { DependencyList, useEffect, useState } from "react";
import { collection, doc, snapToData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";

import firebase from "firebase";
import { of } from "rxjs";

export function useObservableStateFromFBDocRef<T>(
  refFactory: () => firebase.firestore.DocumentReference<T>,
  deps?: DependencyList,
  idField?: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<T>();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    const $ = of(refFactory()).pipe(
      switchMap((ref) => doc(ref)),
      map((snapshot) =>
        snapshot.exists
          ? (snapToData(snapshot, idField || "id") as T)
          : undefined
      )
    );
    const subscription = $.subscribe(
      (data) => {
        setLoading(false);
        setData(data);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    );
    return () => subscription.unsubscribe();
  }, deps);

  return [data, loading, error] as const;
}

export function useObservableStateFromFBColRef<T>(
  refFactory: () =>
    | firebase.firestore.CollectionReference<T>
    | firebase.firestore.Query<T>,
  deps?: DependencyList,
  idField?: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setData([]);
    const $ = of(refFactory()).pipe(
      switchMap((ref) => collection(ref)),
      map((snapshots) =>
        snapshots
          .filter(({ exists }) => exists)
          .map((snapshot) => snapToData(snapshot, idField || "id") as T)
      )
    );
    const subscription = $.subscribe(
      (data) => {
        setLoading(false);
        setData(data);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    );
    return () => subscription.unsubscribe();
  }, deps);

  return [data, loading, error] as const;
}
