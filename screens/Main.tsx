import {} from "react-native-gesture-handler";

import { Button, StyleSheet, Text, View } from "react-native";
import { useStore, useTable } from "../hooks";

import { MainMenu as AppMainMenu } from "../components/app";
import { Slider as BannerSlider } from "../components/banners";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function Main() {
  const store = useStore();
  const table = useTable();
  const navigation = useNavigation();

  if (!store || !table) {
    return (
      <View>
        <Text>설정 필요!</Text>
        <Button
          title="설정하기"
          onPress={() => navigation.navigate("preferences")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BannerSlider />
      <AppMainMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F100",
  },
});

export default Main;
