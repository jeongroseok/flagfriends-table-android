import { StyleSheet, Text, View } from "react-native";
import { useStore, useTable } from "../hooks";

import { MainMenu as AppMainMenu } from "../components/app";
import Configuration from "./Configuration";
import Main from "./Main";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function Screens() {
  const { store, loading: storeLoading, changeStore } = useStore();
  const { table, loading: tableLoading, changeTable } = useTable();
  const loading = storeLoading || tableLoading;

  // const { removeItem: r } = useAsyncStorage("storeId");
  // const { removeItem: r2 } = useAsyncStorage("tableId");
  // r();
  // r2();
  if (loading) {
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Configuration" component={Configuration} />
        {/* <Stack.Screen name="NotFound" component={NotFound} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f100",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Screens };
