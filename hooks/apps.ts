import {
  Product,
  listProductCategoriesByStoreId,
  listProductsByStoreId,
} from "../firebase/products";
import { collection, doc } from "rxfire/firestore";
import { createContext, useContext, useState } from "react";
import { map, switchMap, tap } from "rxjs/operators";
import { useObservable, useObservableState } from "observable-hooks";

import { Banner } from "./banners";
import { ProductCategory } from "./products";
import { Store } from "./stores";
import { Table } from "./tables";
import firebase from "firebase";
import { getStoreById } from "../firebase/stores";
import { getTableById } from "../firebase/tables";
import { listBannersByStoreId } from "../firebase/banners";
import { of } from "rxjs";
import { useSettings } from "./settings";

type AppContext = {
  store: Store | undefined;
  table: Table | undefined;
  banners: Banner[];
  productCategories: ProductCategory[];
  products: Product[];
  loading: boolean;
};

export const AppContext = createContext<AppContext>({
  store: undefined,
  table: undefined,
  banners: [],
  productCategories: [],
  products: [],
  loading: false,
});

function transformSnapshotToData<T>() {
  return map<firebase.firestore.DocumentSnapshot, T | undefined>((snapshot) => {
    if (snapshot.exists) {
      return snapshot.data() as T;
    }
    return undefined;
  });
}

function transformSnapshotsToArray<T>() {
  return map<firebase.firestore.QueryDocumentSnapshot[], T[]>((snapshots) => {
    return snapshots
      .filter(({ exists }) => exists)
      .map((snapshot) => snapshot.data() as T);
  });
}

export function useAppProvider() {
  const { settings } = useSettings();

  const [storeLoading, setStoreLoading] = useState(true);
  const store$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        tap(() => setStoreLoading(true)),
        switchMap(([storeId]) => {
          if (storeId) {
            return doc(getStoreById(storeId)).pipe(
              transformSnapshotToData<Store>()
            );
          }
          return of(undefined);
        }),
        tap(() => setStoreLoading(false))
      ),
    [settings.storeId]
  );

  const [tableLoading, setTableLoading] = useState(true);
  const table$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        tap(() => setTableLoading(true)),
        switchMap(([tableId]) => {
          if (tableId) {
            return doc(getTableById(tableId)).pipe(
              transformSnapshotToData<Table>()
            );
          }
          return of(undefined);
        }),
        tap(() => setTableLoading(false))
      ),
    [settings.tableId]
  );

  const [bannersLoading, setBannersLoading] = useState(true);
  const banners$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        tap(() => setBannersLoading(true)),
        switchMap(([storeId]) => {
          if (storeId) {
            return collection(listBannersByStoreId(storeId)).pipe(
              transformSnapshotsToArray<Banner>()
            );
          }
          return of([]);
        }),
        tap(() => setBannersLoading(false))
      ),
    [settings.storeId]
  );

  const [productCategoriesLoading, setProductCategoriesLoading] =
    useState(true);
  const productCategories$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        tap(() => setProductCategoriesLoading(true)),
        switchMap(([storeId]) => {
          if (storeId) {
            return collection(listProductCategoriesByStoreId(storeId)).pipe(
              transformSnapshotsToArray<ProductCategory>()
            );
          }
          return of([]);
        }),
        tap(() => setProductCategoriesLoading(false))
      ),
    [settings.storeId]
  );

  const [productsLoading, setProductsLoading] = useState(true);
  const products$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        tap(() => setProductsLoading(true)),
        switchMap(([storeId]) => {
          if (storeId) {
            return collection(listProductsByStoreId(storeId)).pipe(
              transformSnapshotsToArray<Product>()
            );
          }
          return of([]);
        }),
        tap(() => setProductsLoading(false))
      ),
    [settings.storeId]
  );

  const loading =
    storeLoading ||
    tableLoading ||
    bannersLoading ||
    productCategoriesLoading ||
    productsLoading;

  return {
    store: useObservableState(store$),
    table: useObservableState(table$),
    banners: useObservableState(banners$, []),
    productCategories: useObservableState(productCategories$, []),
    products: useObservableState(products$, []),
    loading,
  };
}

export function useAppStatus() {
  const { loading } = useContext(AppContext);
  return { loading };
}
