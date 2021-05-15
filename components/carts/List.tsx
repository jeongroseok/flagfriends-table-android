import React, { useCallback, useState } from "react";

import { Colors } from "../../styles";
import { FlatList } from "react-native";
import ListFooter from "./ListFooter";
import ListItem from "./ListItem";
import { cartState } from "../../states";
import { useRecoilState } from "recoil";

// function useProductsFromCart() {
//   const [cart, setCart] = useRecoilState(cartState);
// }

function List() {
  const [cart, setCart] = useRecoilState(cartState);
  const [totalPrice, setTotalPrice] = useState(0);

  //   useEffect(() => {
  //     const _totalPrice = cart
  //       ?.map((product) => product.price * product.quantity)
  //       .reduce((acc, cur) => acc + cur, 0);
  //     setTotalPrice(_totalPrice);
  //   }, [cart]);

  const handleItemDelete = useCallback(
    (productIndex) => {
      //   setCart(cart.filter((product, index) => index !== productIndex));
    },
    [cart]
  );

  const handleItemQuantityChange = useCallback(
    (productIndex, quantity) => {
      //   setCart(
      //     cart.map((product, index) => {
      //       if (index === productIndex) {
      //         return { ...product, quantity };
      //       }
      //       return product;
      //     })
      //   );
    },
    [cart]
  );

  return (
    <FlatList
      style={{
        backgroundColor: "white",
        marginTop: 16,
        paddingTop: 36,
        borderRadius: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        // elevation: 8,
      }}
      data={cart.items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ListItem
          item={item}
          onDelete={() => handleItemDelete(index)}
          onQuantityChange={(quantity) =>
            handleItemQuantityChange(index, quantity)
          }
        />
      )}
      ListFooterComponent={() => <ListFooter totalPrice={totalPrice} />}
    />
  );
}
export default List;
