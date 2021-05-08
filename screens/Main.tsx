import { Alert, AlertButton, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";

import { MainMenu as AppMainMenu } from "../components/app";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

function Main() {
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
      <AppMainMenu onLongPress={handleHiddenOperation} />
      <StatusBar style="auto" />
    </View>
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

export default Main;
