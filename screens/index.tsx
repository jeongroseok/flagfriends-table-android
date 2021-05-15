import Constants from "expo-constants";
import Main from "./Main";
import { NavigationContainer } from "@react-navigation/native";
import Preferences from "./Preferences";
import ProductDetails from "./ProductDetails";
import ProductOrders from "./ProductOrders";
import Products from "./Products";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Screens() {
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
        <Stack.Screen name="productOrders" component={ProductOrders} />
        <Stack.Screen name="preferences" component={Preferences} />
        {/* <Stack.Screen name="NotFound" component={NotFound} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Screens };
