import { Alert, AlertButton, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";

import { MainMenu as AppMainMenu } from "../components/app";
import { Slider as NotificationSlider } from "../components/notifications";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks";

function Main() {
  const { store } = useStore();
  const navigation = useNavigation();
  const handleHiddenOperation = useCallback(() => {
    const buttons: AlertButton[] = [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "default",
        onPress: () => navigation.navigate("Configuration"),
      },
    ];
    Alert.alert(
      "경고",
      "테블릿 설정 기능입니다.\n함부로 쓰면 안돼요!😥😥😥",
      buttons
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* <ProductList storeId={store!.id} /> */}
      <NotificationSlider storeId={store!.id} />
      <AppMainMenu onLongPress={handleHiddenOperation} />
      {/* <StatusBar style="auto" /> */}
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
