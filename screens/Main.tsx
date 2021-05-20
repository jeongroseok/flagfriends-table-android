import {} from "react-native-gesture-handler";

import {
  Alert,
  AlertButton,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useStore, useTable } from "../hooks";

import { MainMenu as AppMainMenu } from "../components/app";
import { Slider as BannerSlider } from "../components/banners";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

function Main() {
  const store = useStore();
  const table = useTable();
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

  const handleCreateCalling = useCallback(
    async (message) => {
      const callingsRef = firebase.database().ref("callings");
      await callingsRef.push({ tableId: table.id, message });
    },
    [table]
  );

  if (!store || !table) {
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

  /**
   *
   *
   *
   * 제스쳐랑 웹뷰랑 같이 쓰면 뻑남!!
   * View에 애니메이션 추가해서 좌우로 스와이프 하자
   *
   *
   *
   */

  return (
    <View style={styles.container}>
      <BannerSlider storeId={store.id} />
      <AppMainMenu
        onLongPress={handleHiddenOperation}
        onPress={(item) => {
          switch (item) {
            case 0:
              (() => {
                const buttons: AlertButton[] = [
                  { text: "취소", style: "cancel" },
                  {
                    text: "확인",
                    style: "default",
                    onPress: () => handleCreateCalling("호출"),
                  },
                ];

                Alert.alert("알림", "호출하시겠습니까?", buttons);
              })();
              break;
            case 1:
              navigation.navigate("productOrders");
              break;
            case 2:
              navigation.navigate("products");
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
