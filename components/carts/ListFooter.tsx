import { Colors, Styles } from "../../styles";
import { Text, View } from "react-native";

import React from "react";

type Props = { totalPrice: number };
function ListFooter({ totalPrice }: Props) {
  return (
    <View
      style={{
        borderTopWidth: 1,
        marginHorizontal: 20,
        marginTop: 36,
        paddingVertical: 24,
      }}
    >
      <Text
        style={[
          Styles.textSmall,
          Styles.textRegular,
          {
            lineHeight: 28,
            textAlign: "center",
          },
        ]}
      >
        TOTAL
      </Text>

      <Text
        style={[
          Styles.textTinyBig,
          Styles.textBold,
          {
            color: Colors.red,
            lineHeight: 25,
            textAlign: "center",
          },
        ]}
      >
        {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Text>
    </View>
  );
}
export default ListFooter;
