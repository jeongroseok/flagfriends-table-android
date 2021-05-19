import { FlatList, Text } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Table,
  TableOrder,
  useCurrencyCode,
  useTable,
  useTableOrdersFromTable,
  useTotalPriceFromTable,
} from "../../../hooks";

import { Colors } from "../../../styles";
import ListFooter from "./ListFooter";
import ListItem from "./ListItem";
import { useRecoilState } from "recoil";

// function useProductsFromCart() {
//   const [cart, setCart] = useRecoilState(cartState);
// }

type Props = {
  table: Table;
  style?: FlatList["props"]["style"];
};
function List({ table, style }: Props) {
  const currencyCode = useCurrencyCode();
  const orders = useTableOrdersFromTable(table);
  const totalPrice = useTotalPriceFromTable(table, currencyCode);

  return (
    <FlatList
      style={[
        style,
        {
          backgroundColor: "white",
          marginTop: 30,
          marginHorizontal: 15,
          paddingTop: 20,
          paddingHorizontal: 10,
          borderRadius: 20,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
        },
      ]}
      scrollEnabled={false}
      data={orders
        .filter((order) =>
          (
            ["COMPLETED", "PENDING", "PROCESSING"] as TableOrder["status"][]
          ).includes(order.status)
        )
        .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)}
      keyExtractor={(item, index) =>
        item.productId + item.createdAt.nanoseconds
      }
      renderItem={({ item, index }) => <ListItem item={item} />}
      ListFooterComponent={() => <ListFooter totalPrice={totalPrice} />}
    />
  );
}
export default List;
