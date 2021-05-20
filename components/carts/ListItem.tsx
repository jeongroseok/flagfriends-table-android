import { Image, Text, View } from "react-native";
import { useCurrencyCode, useLanguageCode, useProductById } from "../../hooks";

import { CartItem } from "../../hooks/carts";
import React from "react";
import { Styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const close = require("../../assets/close_white.png");
const plus = require("../../assets/icon_plus02.png");
const minus = require("../../assets/icon_minus02.png");
const thumbDefault = require("../../assets/thumbDefault.png");

type Props = {
  item: CartItem;
  onChangeQuantity: (quantity: number) => void;
  onDelete: () => void;
};
function ListItem({ item, onChangeQuantity, onDelete }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const product = useProductById(item.productId);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        borderRadius: 32,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 4,
      }}
    >
      <TouchableOpacity
        style={{
          marginLeft: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onDelete}
      >
        <Image style={{ width: 36, height: 36 }} source={close} />
      </TouchableOpacity>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* <Image
          source={thumbDefault}
          style={{
            width: 64,
            height: 64,
            borderRadius: 48,
            backgroundColor: "red",
            overflow: "hidden",
          }}
        /> */}
        <View style={{ justifyContent: "center" }}>
          <Text style={[Styles.textSmall, { color: "white" }]}>
            {product && product.name[languageCode]}
          </Text>
          <Text style={[Styles.textExtraSmall, { color: "#aaa" }]}>
            {product &&
              ((product.price[currencyCode] || 0) * item.quantity)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {currencyCode.toUpperCase()}
          </Text>
        </View>
      </View>
      <View
        style={{
          margin: 8,
          flexDirection: "row",
          alignItems: "center",
          padding: 6,
          borderRadius: 32,
          backgroundColor: "black",
        }}
      >
        <TouchableOpacity onPress={() => onChangeQuantity(item.quantity - 1)}>
          <Image
            source={minus}
            style={{ width: 28, height: 28, marginHorizontal: 4 }}
          />
        </TouchableOpacity>
        <Text
          style={[Styles.textNormal, { marginHorizontal: 8, color: "white" }]}
        >
          {item.quantity}개
        </Text>
        <TouchableOpacity onPress={() => onChangeQuantity(item.quantity + 1)}>
          <Image
            source={plus}
            style={{ width: 28, height: 28, marginHorizontal: 4 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ListItem;
