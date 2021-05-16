import {
  ProductCategory as FBProductCategory,
  Product,
  getProductById,
  getProductCategoryById,
  listProductCategoriesByParentId,
  listProductCategoriesByStoreId,
  listProductsByCategoryIds,
} from "../firebase/products";
import { collectionData, docData } from "rxfire/firestore";
import { filter, map, switchMap } from "rxjs/operators";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useObservable, useObservableState } from "observable-hooks";
import {
  useObservableStateFromFBColRef,
  useObservableStateFromFBDocRef,
} from "./utilities";

export type { Product };
export type ProductCategory = Omit<FBProductCategory, "parentId"> & {
  parent: ProductCategory;
};

/* Hooks */
export function useProductSummariesByCategoryIds(categoryIds: string[]) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        filter(([categoryIds]) => categoryIds.length > 0),
        map(([categoryIds]) => listProductsByCategoryIds(categoryIds)),
        switchMap((ref) => collectionData<Product>(ref, "id"))
      ),
    [categoryIds]
  );

  const state = useObservableState(state$);

  return { productSummaries: state || [] };
}

export function useProductCategoriesByIds(categoryIds: string[]) {
  const [categories, setCategories] = useState<{
    [id: string]: ProductCategory;
  }>({});

  const fetch = useCallback(async (id: string) => {
    let currentId: string | undefined = id;
    let categories: FBProductCategory[] = [];
    do {
      const category = (
        await getProductCategoryById(currentId).get()
      ).data() as FBProductCategory;

      categories.push(category);

      currentId = category.parentId;
    } while (currentId);

    const category = categories
      .reverse()
      .reduce((prev, curr) => ({ ...curr, parent: prev } as ProductCategory));
    return [id, category];
  }, []);

  const fetchAll = useCallback(async (ids) => {
    return Object.fromEntries(await Promise.all(ids.map(fetch)));
  }, []);

  useEffect(() => {
    if (categoryIds.length) {
      fetchAll(categoryIds).then((x) => {
        setCategories(x);
      });
    }
  }, [categoryIds]);

  return categories;
}

export function useProductCategoryIdsFromProducts(products: Product[]) {
  return useMemo(
    () => Array.from(new Set(products.map(({ categoryId }) => categoryId))),
    [products]
  );
}

export function useRootProductCategoriesByStoreId(storeId: string) {
  const [productCategories, loading, error] = useObservableStateFromFBColRef(
    () => listProductCategoriesByStoreId(storeId),
    [storeId]
  );
  return {
    productCategories: productCategories.filter((summary) => !summary.parentId),
    loading,
    error,
  };
}

export function useProductCategoriesByParentId(parentId: string) {
  const state$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        map(([parentId]) => listProductCategoriesByParentId(parentId)),
        switchMap((ref) => collectionData<FBProductCategory>(ref, "id"))
      ),
    [parentId]
  );

  const state = useObservableState(state$);

  return state || [];
}

export function useProductById(id: string) {
  const [product, loading, error] = useObservableStateFromFBDocRef(
    () => getProductById(id),
    [id]
  );
  return { product, loading, error };
}
