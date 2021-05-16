import { CartItem } from "../../states";
import { FlatList } from "react-native";
import ListItem from "./ListItem";
import React from "react";

type Props = {
  cartItems: CartItem[];
  onItemQuantityChange: (index: number, quantity: number) => void;
  onItemDelete: (index: number) => void;
};
function List({ cartItems, onItemQuantityChange, onItemDelete }: Props) {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={cartItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ListItem
          item={item}
          onDelete={() => onItemDelete(index)}
          onChangeQuantity={(quantity) => onItemQuantityChange(index, quantity)}
        />
      )}
    />
  );
}
export default List;
