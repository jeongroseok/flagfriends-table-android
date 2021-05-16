import { FlatList, Text } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Table,
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
};
function List({ table }: Props) {
  const currencyCode = useCurrencyCode();
  const orders = useTableOrdersFromTable(table);
  const totalPrice = useTotalPriceFromTable(table, currencyCode);

  return (
    <FlatList
      style={{
        backgroundColor: "white",
        marginTop: 30,
        marginHorizontal: 15,
        paddingTop: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
      }}
      data={orders}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => <ListItem key={index} item={item} />}
      ListFooterComponent={() => <ListFooter totalPrice={totalPrice} />}
    />
  );
}
export default List;
