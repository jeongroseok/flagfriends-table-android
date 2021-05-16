import { Image, Text, TouchableOpacity, View } from "react-native";

import { QuantitySelector } from "./components/app";
import React from "react";
import { Styles } from "./styles";

const close = require("./assets/close_white.png");
const plus = require("./assets/icon_plus02.png");
const minus = require("./assets/icon_minus02.png");

function ListItem() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        borderRadius: 64,
        // padding: 16,
        margin: 8,
      }}
    >
      <TouchableOpacity
        style={{
          width: 36,
          height: 36,
          marginLeft: 16,
          backgroundColor: "#333",
          borderRadius: 48,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <Image style={{ width: 48, height: 48 }} source={close} />
      </TouchableOpacity>
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <Text style={[Styles.textSmall, { color: "white" }]}>상품명</Text>
        <Text style={[Styles.textTinySmall, { color: "white" }]}>가격</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          margin: 16,
          borderRadius: 32,
          backgroundColor: "black",
        }}
      >
        <TouchableOpacity>
          <Image
            source={minus}
            style={{ width: 28, height: 28, marginHorizontal: 4 }}
          />
        </TouchableOpacity>
        <Text
          style={[Styles.textNormal, { marginHorizontal: 8, color: "white" }]}
        >
          1개
        </Text>
        <TouchableOpacity>
          <Image
            source={plus}
            style={{ width: 28, height: 28, marginHorizontal: 4 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Test() {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        borderRadius: 32,
        backgroundColor: "#131313",
        paddingHorizontal: 16,
      }}
    >
      <View style={{ margin: 16, alignItems: "center" }}>
        <View
          style={{
            width: 96,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#1f1f1f",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ListItem />
        <ListItem />
        <ListItem />
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{
            paddingVertical: 20,
            borderRadius: 32,
            backgroundColor: "#1E2326",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[Styles.textNormal, { color: "white" }]}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
