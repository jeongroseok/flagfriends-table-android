import { Colors, Styles } from "../../styles";
import { Dimensions, Text, View } from "react-native";
import React, { useState } from "react";
import { useCart, useTotalPriceFromCartItems } from "../../hooks/carts";
import { useCurrencyCode, useTable } from "../../hooks";

import BottomSheet from "reanimated-bottom-sheet";
import List from "./List";
import { TouchableOpacity } from "react-native-gesture-handler";

function CartSheet() {
  const currencyCode = useCurrencyCode();
  const table = useTable();
  const { items, addItem, changeItemQuantity, deleteItem, clear } = useCart();
  const totalPrice = useTotalPriceFromCartItems(items, currencyCode);
  const [pending, setPending] = useState(false);
  const orderDisabled = pending || items.length <= 0;

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
        장바구니 (위로 올리기)
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
          disabled={orderDisabled}
          onPress={async () => {
            if (table.status !== "OCCUPIED") {
              await table.occupy();
            }
            await items.map(async (item) => {
              for (let i = 0; i < item.quantity; i++)
                await table.order(item.productId, item.optionSelections);
            });
            alert("주문 완료");
            clear();
          }}
          style={{
            margin: 10,
            padding: 20,
            borderRadius: 32,
            backgroundColor: orderDisabled ? "#1E232666" : "#1E2326",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              Styles.textNormal,
              { color: orderDisabled ? "#FFFFFF66" : "#FFF" },
            ]}
          >
            주문하기
          </Text>
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
