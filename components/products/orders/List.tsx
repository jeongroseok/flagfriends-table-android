import { Colors, Styles } from "../../../styles";
import { FlatList, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableOrder,
  useCurrencyCode,
  useTable,
  useTableOrdersFromTable,
  useTotalPriceFromTable,
} from "../../../hooks";

import ListFooter from "./ListFooter";
import ListItem from "./ListItem";
import { useRecoilState } from "recoil";

// function useProductsFromCart() {
//   const [cart, setCart] = useRecoilState(cartState);
// }

type Props = View["props"] & {
  table: Table;
};
function List({ table, ...props }: Props) {
  const currencyCode = useCurrencyCode();
  const orders = useTableOrdersFromTable(table);
  const availableOrders = useMemo(
    () =>
      orders
        .filter((order) =>
          (
            ["COMPLETED", "PENDING", "PROCESSING"] as TableOrder["status"][]
          ).includes(order.status)
        )
        .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds),
    [orders]
  );
  const totalPrice = useTotalPriceFromTable(table, currencyCode);

  return (
    <View
      {...props}
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
    >
      <Text
        style={[Styles.textNormal, { textAlign: "center", marginBottom: 16 }]}
      >
        {table.name}테이블 주문 기록
      </Text>
      {availableOrders.map((order) => (
        <ListItem key={order.id} item={order} />
      ))}
      <ListFooter totalPrice={totalPrice} />
    </View>
  );
}
export default List;
