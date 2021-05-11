import { Colors, Styles } from "../../styles";
import { Product, useCurrencyCode } from "../../hooks";
import { Text, View } from "react-native";

import React from "react";

type Props = {
  price: Product["price"];
};
function PriceSection({ price }: Props) {
  const currencyCode = useCurrencyCode();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
      }}
    >
      <Text
        style={[
          Styles.textExtraBig,
          Styles.textBold,
          {
            color: Colors.red,
            textAlign: "center",
            lineHeight: 39,
          },
        ]}
      >
        {price[currencyCode]
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}
      </Text>
      <Text
        style={[
          Styles.textBold,
          Styles.textSmall,
          {
            color: Colors.red,
            textAlign: "center",
          },
        ]}
      >
        {currencyCode}
      </Text>
    </View>
  );
}
export default PriceSection;
