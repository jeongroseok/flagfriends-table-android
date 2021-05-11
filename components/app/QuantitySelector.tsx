import { Image, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { Styles } from "../../styles";

const iconMinus = require("../../assets/icon_minus.png");
const iconPlus = require("../../assets/icon_plus.png");

type Props = {
  value: number;
  onChange: (value: number) => void;
};
function QuantitySelector({ value, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 23,
      }}
    >
      <TouchableOpacity
        onPress={() => onChange(value - 1)}
        style={{ opacity: value > 1 ? 1 : 0.1 }}
        disabled={value <= 1}
      >
        <Image style={{ width: 36, height: 36 }} source={iconMinus} />
      </TouchableOpacity>
      <Text
        style={[
          Styles.textTinyBig,
          Styles.textBold,
          {
            lineHeight: 36,
            paddingHorizontal: 30,
          },
        ]}
      >
        {value}
      </Text>
      <TouchableOpacity onPress={() => onChange(value + 1)}>
        <Image style={{ width: 36, height: 36 }} source={iconPlus} />
      </TouchableOpacity>
    </View>
  );
}
export default QuantitySelector;
