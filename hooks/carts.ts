import produce from "immer";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { CartItem, cartItemsState } from "../states";

export type { CartItem };

export function useCart() {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  return useMemo(() => {
    const addItem = (item: CartItem) =>
      setCartItems(
        produce((draft) => {
          draft.push(item);
        })
      );

    const increaseItemQuantity = (index: number, amount: number) =>
      setCartItems(
        produce((draft) => {
          draft[index].quantity += amount;
        })
      );

    const decreaseItemQuantity = (index: number, amount: number) =>
      setCartItems(
        produce((draft) => {
          draft[index].quantity -= amount;
        })
      );

    const deleteItem = (index: number) =>
      setCartItems(
        produce((draft) => {
          delete draft[index];
        })
      );
    const clear = () => setCartItems([]);
    return {
      items: cartItems,
      addItem,
      increaseItemQuantity,
      decreaseItemQuantity,
      deleteItem,
      clear,
    };
  }, [cartItems]);
}
