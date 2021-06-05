import {
  MainMenu as AppMainMenu,
  VersionText as AppVersionText,
} from "../components/app";
import { Button, StyleSheet, Text, View } from "react-native";
import { useStore, useTable } from "../hooks";

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
      <AppVersionText style={styles.versionText} />
      <AppMainMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F100",
  },
  versionText: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Main;
