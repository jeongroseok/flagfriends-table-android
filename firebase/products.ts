import firebase from "firebase";

enum Badge {
  BEST = "BEST",
  NEW = "NEW",
  RECOMMENDED = "RECOMMENDED",
}

interface Selection {
  name: { [code: string]: string };
  description: { [code: string]: string };
  price: { [code: string]: number };
}

interface Option {
  name: { [code: string]: string };
  description: { [code: string]: string };
  multiple: boolean;
  required: boolean;
  selections: { [id: string]: Selection };
  defaultSelections: { [id: string]: boolean };
}

export interface ProductCategory {
  readonly id: string;
  readonly storeId: string;
  readonly parentId?: ProductCategory["id"];
  name: { [code: string]: string };
}

export interface Product {
  readonly id: string;
  readonly storeId: string;
  categoryId: ProductCategory["id"];
  name: { [code: string]: string };
  description: { [code: string]: string };
  status: "HIDDEN" | "SOLDOUT" | "READY";
  price: { [code: string]: number };
  media: { [type: string]: string };
  badges: Badge[];
  options: { [id: string]: Option };
  orderCancelable: boolean;
  jobProcessIds: string[];
  recipe: string;
  prerequisiteIds: string[];
  readonly createdAt:
    | firebase.firestore.Timestamp
    | firebase.firestore.FieldValue;
}

const productConverter = {
  toFirestore({ id, ...rest }: Product): firebase.firestore.DocumentData {
    return rest;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as Product;
  },
};

const productCategoryConverter = {
  toFirestore({
    id,
    ...rest
  }: ProductCategory): firebase.firestore.DocumentData {
    return rest;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as ProductCategory;
  },
};

const productsRef = firebase
  .firestore()
  .collection("products")
  .withConverter(productConverter);
const productCategoriesRef = firebase
  .firestore()
  .collection("productCategories")
  .withConverter(productCategoryConverter);
const productStorageRef = firebase.storage().ref("products");

export const listProductsByCategoryIds = (categoryIds: string[]) =>
  productsRef.where("categoryId", "in", categoryIds);

export const getProductById = (id: string) => productsRef.doc(id);

export const getProductCategoryById = (id: string) =>
  productCategoriesRef.doc(id);

export const listProductCategoriesByIds = (ids: string[]) =>
  productCategoriesRef.where(
    firebase.firestore.FieldPath.documentId(),
    "in",
    ids
  );

export const listProductCategoriesByStoreId = (storeId: string) =>
  productCategoriesRef.where("storeId", "==", storeId);

export const listProductCategoriesByParentId = (parentId: string) =>
  productCategoriesRef.where("parentId", "==", parentId);
