import { Alert, AlertButton, Text } from "react-native";
import React, { useCallback } from "react";

import CircularMenu from "./CircularMenu";
import IconBill from "../../assets/ficon13.svg";
import IconCall from "../../assets/ficon9.svg";
import IconGift from "../../assets/ficon4.svg";
import IconJukebox from "../../assets/ficon11.svg";
import IconLogo from "../../assets/ficon1.svg";
import IconOrder from "../../assets/ficon10.svg";
import styled from "styled-components/native";
import { useCallingAlert } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

const MainMenuItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.3 : 1.0)};
`;

type Props = {};
function MainMenu({}: Props) {
  const navigation = useNavigation();
  const { alert } = useCallingAlert();

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

  return (
    <CircularMenu
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
      radius={128}
      center={<IconLogo width={60} height={60} fill={"white"} />}
      onLongPress={handleHiddenOperation}
    >
      <MainMenuItem onPress={alert}>
        <IconCall width={50} height={50} fill="black" />
        <Text>직원 호출</Text>
      </MainMenuItem>
      <MainMenuItem onPress={() => navigation.navigate("productOrders")}>
        <IconBill width={50} height={50} fill="black" />
        <Text>주문 목록</Text>
      </MainMenuItem>
      <MainMenuItem onPress={() => navigation.navigate("products")}>
        <IconOrder width={50} height={50} fill="black" />
        <Text>제품 주문</Text>
      </MainMenuItem>
      <MainMenuItem onPress={() => navigation.navigate("songs")} >
        <IconJukebox width={50} height={50} fill="black" />
        <Text>노래 선곡</Text>
      </MainMenuItem>
      <MainMenuItem disabled>
        <IconGift width={50} height={50} fill="black" />
        <Text>메가폰(테스트)</Text>
      </MainMenuItem>
    </CircularMenu>
  );
}
export default MainMenu;
