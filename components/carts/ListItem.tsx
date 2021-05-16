import { Colors, Styles } from "../../styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product, useLanguageCode, useProductById } from "../../hooks";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../states";

const close = require("../../assets/close.png");
const iconMinus = require("../../assets/icon_minus02.png");
const iconPlus = require("../../assets/icon_plus02.png");

type Props = {
  item: CartItem;
  onDelete: () => void;
  onQuantityChange: (value: number) => void;
};
export default function ListItem({ item, onDelete, onQuantityChange }: Props) {
  const languageCode = useLanguageCode();
  const { product } = useProductById(item.productId);
  const [optionsDescription, setOptionsDescription] = useState();

  useEffect(() => {
    // const strings = item?.options?.map((option) => {
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
        minHeight: 84,
        paddingVertical: 8,
        backgroundColor: Colors.white,
      }}
    >
      <TouchableOpacity
        style={{
          width: 36,
          marginLeft: 4,
          justifyContent: "center",
        }}
        onPress={onDelete}
      >
        <Image style={{ width: 48, height: 48 }} source={close} />
      </TouchableOpacity>
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
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          marginRight: 22,
        }}
      >
        <View
          style={{
            paddingVertical: 6,
            paddingHorizontal: 8,
            flexDirection: "row",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: Colors.lightGray,
          }}
        >
          <TouchableOpacity
            style={{
              width: 24,
              justifyContent: "center",
            }}
            onPress={() => onQuantityChange(Math.max(item.quantity - 1, 1))}
          >
            <Image style={{ width: 24, height: 24 }} source={iconMinus} />
          </TouchableOpacity>
          <View
            style={{
              width: 48,
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                Styles.textSmall,
                Styles.textRegular,
                {
                  lineHeight: 25,
                  textAlign: "center",
                },
              ]}
            >
              {item.quantity}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 24,
              justifyContent: "center",
            }}
            onPress={() => onQuantityChange(item.quantity + 1)}
          >
            <Image style={{ width: 24, height: 24 }} source={iconPlus} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>X</Text>
        </TouchableOpacity> */}
    </View>
  );
}
