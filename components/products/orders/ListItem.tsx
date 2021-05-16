import { Colors, Styles } from "../../../styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  Product,
  TableOrder,
  useCurrencyCode,
  useLanguageCode,
  useProductById,
} from "../../../hooks";
import React, { useEffect, useMemo, useState } from "react";

import moment from "moment";

const thumbDefault = require("../../../assets/thumbDefault.png");

type Props = {
  item: TableOrder;
};
export default function ListItem({ item }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const { product } = useProductById(item.productId);
  const thumbnailImage = useMemo(() => {
    if (!product?.media.thumbnail) return thumbDefault;
    return { uri: product.media.thumbnail };
  }, [product]);
  const [optionsDescription, setOptionsDescription] = useState();

  useEffect(() => {
    // const strings = item.optionSelections.map((option) => {
    //   const selectedValue = option.values[option.selectedIndex];
    //   if (typeof selectedValue === "string") {
    //     return selectedValue;
    //   } else {
    //     return selectedValue.text;
    //   }
    // });
    // const desc = strings.reduce((accumulator, currentValue, currentIndex) => {
    //   if (!currentIndex) {
    //     return currentValue;
    //   }
    //   return accumulator + ", " + currentValue;
    // });
    // setOptionsDescription(desc);
  }, [item]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 0,
        backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          width: 54,
          height: 54,
          // backgroundColor: Colors.lightGray,
          marginLeft: 8,
          marginRight: 4,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={thumbnailImage}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: 12 }}>
        <Text
          style={[Styles.textSmall, Styles.textRegular, { lineHeight: 22 }]}
        >
          {product?.name[languageCode]}
        </Text>
        <Text
          style={[
            Styles.textExtraSmall,
            Styles.textRegular,
            { lineHeight: 14 },
          ]}
        >
          ({optionsDescription})
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          marginHorizontal: 0,
          marginRight: 22,
        }}
      >
        <Text style={[Styles.textExtraSmall, { color: "gray" }]}>
          {moment((item.createdAt as any).toDate?.() || new Date()).format(
            "HH:mm"
          )}
        </Text>
        <Text style={{ color: Colors.red }}>
          {(product?.price[currencyCode] || 0)
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          {currencyCode.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
