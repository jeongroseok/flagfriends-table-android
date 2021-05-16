import { atom } from "recoil";

// export const currentStoreIdState = atom<Store["id"] | undefined>({
//   key: "currentStoreIdState",
//   default: undefined,
// });

export interface CartItem {
  readonly productId: string;
  readonly optionSelections: {
    readonly [optionId: string]: { readonly [selectionId: string]: boolean };
  };
  quantity: number;
}

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
});
