import { Alert, AlertButton, Dimensions, Text, View } from "react-native";
import { Colors, Styles } from "../../styles";
import React, { useCallback, useMemo, useState } from "react";
import { TableOrder, useCurrencyCode, useTable } from "../../hooks";
import { useCart, useTotalPriceFromCartItems } from "../../hooks/carts";

import BottomSheet from "reanimated-bottom-sheet";
import List from "./List";
import { TouchableOpacity } from "react-native-gesture-handler";

function CartSheet() {
  const currencyCode = useCurrencyCode();
  const table = useTable();
  const { items, changeItemQuantity, deleteItem, clear } = useCart();
  const totalPrice = useTotalPriceFromCartItems(items, currencyCode);
  const [pending, setPending] = useState(false);
  const orderDisabled = pending || items.length <= 0;

  const totalCount = useMemo(
    () =>
      items
        .map(({ quantity }) => quantity)
        .reduce((prev, curr) => prev + curr, 0),
    [items]
  );

  const handleOrder = useCallback(async () => {
    setPending(true);
    if (table.status !== "OCCUPIED") {
      await table.occupy();
    }

    let orderItems: Omit<TableOrder, "createdAt" | "status">[] = [];
    items.forEach(({ productId, optionSelections, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        orderItems.push({ productId, optionSelections, discounts: [] });
      }
    });
    await table.order(orderItems);
    alert("주문 완료");
    setPending(false);
    clear();
  }, [setPending, table, clear]);

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
          { marginTop: 12, color: "white", textAlign: "center" },
        ]}
      >
        장바구니 (위로 올리기)
      </Text>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#222",
          marginVertical: 18,
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
            const buttons: AlertButton[] = [
              { text: "취소", style: "cancel" },
              {
                text: "확인",
                style: "default",
                onPress: handleOrder,
              },
            ];
            Alert.alert(
              "주문 확인",
              `${totalCount}개의 제품을 주문하시겠습니까?`,
              buttons
            );
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
      snapPoints={[Dimensions.get("window").height, 72]}
      initialSnap={1}
      borderRadius={10}
      renderContent={renderContent}
      enabledContentTapInteraction={true}
    />
  );
}
export default CartSheet;
