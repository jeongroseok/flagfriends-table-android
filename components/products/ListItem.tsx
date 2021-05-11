import { Colors, Styles } from "../../styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product, useCurrencyCode, useLanguageCode } from "../../hooks";
import React, { useMemo } from "react";

import PropTypes from "prop-types";

const soldout = require("../../assets/soldout.png");
const thumbDefault = require("../../assets/thumbDefault.png");
const badge01 = require("../../assets/badge01.png");
const badge02 = require("../../assets/badge02.png");
const badge03 = require("../../assets/badge03.png");

// productSummary 변수 설명
// const PRODUCT_TEMPLATE = {
//   category: "",
//   description: "",
//   detailImage: null,
//   displayed: true,
//   enabled: true,
//   name: "",
//   price: "",
//   section: "",
//   stockout: false,
//   thumbnailImage: null,
// };

function ProductListItemBadge({ type }: { type: Product["badges"][0] }) {
  let imageSrc = null;
  switch (type) {
    case "BEST":
      imageSrc = badge03;
      break;
    case "NEW":
      imageSrc = badge01;
      break;
    case "RECOMMENDED":
      imageSrc = badge02;
      break;
    default:
      imageSrc = null;
      break;
  }
  return (
    <View
      style={{
        width: 78,
        height: 78,
        marginRight: 10,
        paddingTop: 12,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
        }}
        source={imageSrc}
      />
    </View>
  );
}

type Props = {
  productSummary: Product;
  onPress: (id: string) => void;
};
function ListItem({ productSummary, onPress }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const thumbnailImage = useMemo(() => {
    if (!productSummary.media.thumbnail) return thumbDefault;
    return { uri: productSummary.media.thumbnail };
  }, [productSummary]);

  const enabled = productSummary.status !== "READY";

  return (
    <TouchableOpacity
      disabled={!enabled}
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        backgroundColor: enabled ? "white" : "#f4f4f4",
      }}
      onPress={() => onPress(productSummary.id)}
    >
      <View
        style={{
          width: 78,
          height: 78,
          marginVertical: 6,
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

        {productSummary.status === "SOLDOUT" && (
          <Image
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            source={soldout}
          />
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={[Styles.textNormal, Styles.textRegular, { lineHeight: 24 }]}
        >
          {productSummary.name[languageCode]}
        </Text>
        <Text
          style={[
            Styles.textSmall,
            Styles.textLight,
            { lineHeight: 20, marginLeft: 1 },
          ]}
        >
          {productSummary.price[currencyCode]} 원
        </Text>
      </View>
      <ProductListItemBadge type={productSummary.badges[0]} />
    </TouchableOpacity>
  );
}
export default ListItem;
