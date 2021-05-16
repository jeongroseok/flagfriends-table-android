import { Text, View } from "react-native";

import { Colors } from "../../styles";
import { List as ProductOrderList } from "../../components/products/orders";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTable } from "../../hooks";

function ProductOrders() {
  const navigation = useNavigation();
  const table = useTable();

  return (
    <View
      style={{
        backgroundColor: Colors.fancygray,
        paddingHorizontal: 20,
        marginTop: 4,
      }}
    >
      <ProductOrderList table={table} />
      <View style={{ paddingVertical: 26, paddingHorizontal: 8 }}>
        {[
          {
            text: `결제 시 테이블 번호 ${table.name}을(를) 말씀해 주세요.`,
            highlight: false,
          },
          {
            text: "결제는 카운터에서 진행해 주십시오.",
            highlight: true,
          },
        ].map(({ text, highlight }, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", paddingVertical: 4 }}
          >
            <Text style={{ color: highlight ? Colors.red : "black" }}>
              {"\u2022"}
            </Text>
            <Text
              style={{
                flex: 1,
                paddingLeft: 5,
                color: highlight ? Colors.red : "black",
              }}
            >
              {text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
export default ProductOrders;
