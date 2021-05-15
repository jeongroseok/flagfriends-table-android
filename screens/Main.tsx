import {
  Alert,
  AlertButton,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";

import { MainMenu as AppMainMenu } from "../components/app";
import { Slider as NotificationSlider } from "../components/notifications";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks";

function Main() {
  const store = useStore();
  const navigation = useNavigation();
  const handleHiddenOperation = useCallback(() => {
    const buttons: AlertButton[] = [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "default",
        onPress: () => navigation.navigate("preferences"),
      },
    ];
    Alert.alert(
      "경고",
      "테블릿 설정 기능입니다.\n함부로 쓰면 안돼요!😥😥😥",
      buttons
    );
  }, []);

  if (!store) {
    return (
      <View>
        <Text>설정 필요!</Text>
        <Button
          title="설정"
          onPress={() => navigation.navigate("preferences")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NotificationSlider storeId={store.id} />
      <AppMainMenu
        onLongPress={handleHiddenOperation}
        onPress={(item) => {
          switch (item) {
            case 2:
              navigation.navigate("products");
              break;
            case 3:
              navigation.navigate("productOrders");
              break;
          }
        }}
      />
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
