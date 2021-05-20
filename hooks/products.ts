import { Product, ProductCategory } from "../firebase/products";
import { useContext, useMemo } from "react";

import { AppContext } from "./apps";

export type { Product, ProductCategory };

/* Hooks */
export function useProducts() {
  return useContext(AppContext).products;
}

export function useProductById(id: string) {
  return useContext(AppContext).products.filter(({ id: pid }) => pid === id)[0];
}

export function useProductCategoriesByIds(categoryIds: string[]) {
  const productCategories = useProductCategories();
  return useMemo(
    () => productCategories.filter(({ id }) => categoryIds.includes(id)),
    productCategories
  );
}

export function useProductCategoryIdsFromProducts(products: Product[]) {
  return useMemo(
    () => Array.from(new Set(products.map(({ categoryId }) => categoryId))),
    [products]
  );
}

export function useProductCategories() {
  return useContext(AppContext).productCategories;
}

export function useRootProductCategories() {
  const productCategories = useProductCategories();
  return useMemo(
    () => productCategories.filter(({ parentId }) => !parentId),
    productCategories
  );
}

export function useProductCategoriesByParentId(parentId: string) {
  const productCategories = useProductCategories();
  return useMemo(
    () => productCategories.filter(({ parentId: pid }) => pid === parentId),
    productCategories
  );
}
