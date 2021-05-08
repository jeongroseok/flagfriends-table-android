import {
  Product,
  ProductCategory,
  getProductById,
  getProductCategoryById,
  listProductsByStoreId,
} from "../firebase/products";
import { collectionData, docData } from "rxfire/firestore";
import { map, switchMap } from "rxjs/operators";
import { useEffect, useState } from "react";
import { useObservable, useObservableState } from "observable-hooks";

export type { Product };
export type { ProductCategory };

/* Hooks */
export function useAllProductSummariesByStoreId(storeId: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([storeId]) =>
          listProductsByStoreId(storeId).orderBy("categoryId")
        ),
        switchMap((ref) => collectionData<Product>(ref, "id"))
      ),
    [storeId]
  );

  const state = useObservableState(state$);

  return state || [];
}

export function useProductCategoryNamesByIds(
  ids: ProductCategory["id"][],
  languageCode: string
) {
  type Category = Omit<ProductCategory, "id">;
  const [categoryNames, setCategoryNames] = useState<{
    [id: string]: string;
  }>({});
  useEffect(() => {
    (async () => {
      setCategoryNames(
        Object.fromEntries(
          await Promise.all(
            ids.map(async (id) => {
              const names: string[] = [];
              let currentId: string | undefined = id;
              do {
                const category = (
                  await getProductCategoryById(currentId).get()
                ).data() as Category;
                names.push(category.name[languageCode]);
                currentId = category.parentId;
              } while (currentId);
              return [id, names.reverse().join("/")];
            })
          )
        )
      );
    })();
  }, [ids, languageCode]);

  return categoryNames;
}

export function useProductById(id: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([id]) => getProductById(id)),
        switchMap((ref) =>
          docData<Product>(ref, "id").pipe(map((value) => ({ ref, value })))
        )
      ),
    [id]
  );
  const state = useObservableState(state$);
  return state?.value;
}
