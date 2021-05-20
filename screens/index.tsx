import { Text, View } from "react-native";
import { useStoreSelector, useTableSelector } from "../hooks";

import Constants from "expo-constants";
import Landing from "./Landing";
import Main from "./Main";
import { NavigationContainer } from "@react-navigation/native";
import Preferences from "./Preferences";
import ProductDetails from "./ProductDetails";
import ProductOrders from "./ProductOrders";
import Products from "./Products";
import React from "react";
import WebView from "react-native-webview";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Screens() {
  const {
    store,
    loading: storeLoading,
    error: storeError,
  } = useStoreSelector();
  const {
    table,
    loading: tableLoading,
    error: tableError,
  } = useTableSelector();
  const loading = storeLoading || tableLoading;
  const ok = store && table; // 변수명 바꿀 것
  console.log(`store: ${store}, table: ${table}`);
  if (loading) {
    return <Text>loading</Text>;
  }

  if (tableError || storeError) {
    return (
      <View>
        <Text>store error:{JSON.stringify(storeError)}</Text>
        <Text>table error:{JSON.stringify(tableError)}</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"main"}
        screenOptions={{
          headerStyle: {
            height: 60 + Constants.statusBarHeight,
            borderBottomWidth: 1,
            borderBottomColor: "#00000008",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            letterSpacing: -0.25,
            fontWeight: "normal",
            fontSize: 18,
          },
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerBackAllowFontScaling: false,
        }}
      >
        {ok ? (
          <>
            <Stack.Screen
              name="main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="products"
              component={Products}
              options={{ title: "상품목록" }}
            />
            <Stack.Screen name="productDetails" component={ProductDetails} />
            <Stack.Screen
              name="productOrders"
              component={ProductOrders}
              options={{ title: "주문목록" }}
            />
            <Stack.Screen name="preferences" component={Preferences} />
          </>
        ) : (
          <Stack.Screen name="landing" component={Landing} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Screens };
