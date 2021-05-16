import { CartItem, cartItemsState } from "../states";
import { map, switchMap } from "rxjs/operators";
import { useObservable, useObservableState } from "observable-hooks";

import { getProductById } from "../firebase/products";
import produce from "immer";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

export type { CartItem };

export function useCart() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  return useMemo(() => {
    const addItem = (item: CartItem) =>
      setCartItems(
        produce((draft) => {
          const index = draft.findIndex((x) => {
            if (x.productId !== item.productId) return false;
            if (
              JSON.stringify(x.optionSelections) !==
              JSON.stringify(item.optionSelections)
            )
              return false;
            return true;
          });
          if (index >= 0) {
            draft[index].quantity += item.quantity;
          } else {
            draft.push(item);
          }
        })
      );

    const changeItemQuantity = (index: number, quantity: number) =>
      setCartItems(
        produce((draft) => {
          draft[index].quantity = Math.max(1, quantity);
        })
      );

    const deleteItem = (index: number) =>
      setCartItems(
        produce((draft) => {
          draft.splice(index, 1);
        })
      );
    const clear = () => setCartItems([]);
    return {
      items: cartItems,
      addItem,
      deleteItem,
      changeItemQuantity,
      clear,
    };
  }, [cartItems]);
}

export function useTotalPriceFromCartItems(
  cartItems: CartItem[],
  currencyCode: string
) {
  const totalPrice$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        switchMap(async ([cartItems]) => {
          const products = await Promise.all(
            cartItems.map(async (cartItem) => {
              const snapshot = await getProductById(cartItem.productId).get();
              return {
                price: snapshot.data()?.price?.[currencyCode] || 0,
                quantity: cartItem.quantity,
              };
            })
          );
          return products.reduce(
            (totalPrice, { price, quantity }) => totalPrice + price * quantity,
            0
          );
        })
      ),
    [cartItems]
  );
  return useObservableState(totalPrice$);
}
