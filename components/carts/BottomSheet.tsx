import { Colors, Styles } from "../../styles";
import { Dimensions, Text, View } from "react-native";
import { useCart, useTotalPriceFromCartItems } from "../../hooks/carts";

import BottomSheet from "reanimated-bottom-sheet";
import List from "./List";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCurrencyCode } from "../../hooks";

function CartSheet() {
  const currencyCode = useCurrencyCode();
  const { items, addItem, changeItemQuantity, deleteItem } = useCart();
  const totalPrice = useTotalPriceFromCartItems(items, currencyCode);
  const renderContent = () => (
    <View
      style={{
        display: "flex",
        height: "100%",
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        borderRadius: 32,
        backgroundColor: "#131313",
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 96,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#1f1f1f",
          }}
        />
      </View>
      <Text
        style={[
          Styles.textSmall,
          { marginTop: 6, color: "white", textAlign: "center" },
        ]}
      >
        담은 상품
      </Text>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#222",
          marginVertical: 12,
        }}
      />
      <List
        cartItems={items}
        onItemDelete={(index) => deleteItem(index)}
        onItemQuantityChange={(index, quantity) => {
          changeItemQuantity(index, quantity);
        }}
      />
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ alignItems: "center", marginVertical: 4 }}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.red,
              // textAlign: "center",
              borderBottomWidth: 2,
              letterSpacing: -0.5,
              borderColor: Colors.red,
            }}
          >
            {totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {currencyCode.toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            addItem({
              productId: "5MImdFtFbItkOCLMJ9gF",
              optionSelections: {},
              quantity: 1,
            });
          }}
          style={{
            margin: 10,
            padding: 20,
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
  return (
    <BottomSheet
      snapPoints={[Dimensions.get("window").height, 60]}
      initialSnap={1}
      borderRadius={10}
      renderContent={renderContent}
      enabledContentTapInteraction={true}
    />
  );
}
export default CartSheet;
