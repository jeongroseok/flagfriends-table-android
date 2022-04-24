import { useAppStatus, useSettings } from "../hooks";

import { CenteredText } from "../components/app";
import Constants from "expo-constants";
import Main from "./Main";
import { NavigationContainer } from "@react-navigation/native";
import Preferences from "./Preferences";
import ProductDetails from "./ProductDetails";
import ProductOrders from "./ProductOrders";
import Products from "./Products";
import Songs from "./Songs";
import React from "react";
import Settings from "./Settings";
import { createStackNavigator } from "@react-navigation/stack";
import { useCommonSettings } from "../styles";

const Stack = createStackNavigator();

function Screens() {
  const { fontsLoaded } = useCommonSettings();
  const { settings, loading: settingsLoading } = useSettings();
  const { loading: appLoading } = useAppStatus();

  const loading = !fontsLoaded || settingsLoading || appLoading;
  const needsSettings = settings.storeId && settings.tableId;

  if (loading) {
    return <CenteredText>로딩 중...</CenteredText>;
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
        {needsSettings ? (
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
              options={{ title: "주문기록" }}
            />
            <Stack.Screen
              name="songs"
              component={Songs}
              options={{title: "노래선곡"}}
            />
            <Stack.Screen name="preferences" component={Preferences} />
          </>
        ) : (
          <Stack.Screen name="settings" component={Settings} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Screens };
