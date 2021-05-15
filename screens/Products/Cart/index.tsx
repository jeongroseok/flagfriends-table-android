import { Colors, Styles } from "../../../styles";
import { Text, TouchableOpacity, View } from "react-native";

import { List as CartList } from "../../../components/carts";
import { Overlapping } from "../../../components/app";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function Cart() {
  const navigation = useNavigation();
  navigation.setOptions({
    title: "장바구니",
  });
  return (
    <View
      style={{
        backgroundColor: Colors.fancygray,
        paddingHorizontal: 20,
        marginTop: 4,
      }}
    >
      <CartList />
      <View style={{ paddingVertical: 26, paddingHorizontal: 8 }}>
        {[
          {
            text: "주문하기 버튼을 누르면 바로 조리가 들어가 주문 취소가 불가능합니다.",
            highlight: true,
          },
          {
            text: "추가주문은 앱으로 가능합니다.",
            highlight: false,
          },
          {
            text: "결제는 나가실 때 카운터에서 하시면 됩니다.",
            highlight: false,
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
export default Cart;
