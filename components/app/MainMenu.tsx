import { Pressable, Text } from "react-native";

import CircularMenu from "./CircularMenu";
import IconBill from "../../assets/ficon2.svg";
import IconCall from "../../assets/ficon9.svg";
import IconGame from "../../assets/ficon3.svg";
import IconGift from "../../assets/ficon4.svg";
import IconJukebox from "../../assets/ficon11.svg";
import IconLogo from "../../assets/ficon1.svg";
import IconOrder from "../../assets/ficon10.svg";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const MenuItem = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisabledMenuItem = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
`;

enum MainMenuItem {
  직원호출,
  중간계산서요청,
  제품주문,
  주문목록,
}
type Props = {
  onPress?: (item: MainMenuItem) => void;
  onLongPress?: () => void;
};
function MainMenu({ onPress, onLongPress }: Props) {
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
      onLongPress={onLongPress}
    >
      <TouchableOpacity onPress={() => onPress?.(MainMenuItem.중간계산서요청)}>
        <MenuItem>
          <IconCall width={50} height={50} fill="black" />
          <Text>직원 호출</Text>
        </MenuItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress?.(MainMenuItem.중간계산서요청)}>
        <MenuItem>
          <IconBill width={50} height={50} fill="black" />
          <Text>중간계산서 요청</Text>
        </MenuItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress?.(MainMenuItem.제품주문)}>
        <MenuItem>
          <IconOrder width={50} height={50} fill="black" />
          <Text>제품 주문</Text>
        </MenuItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <DisabledMenuItem>
          <IconJukebox width={50} height={50} fill="black" />
          <Text>노래 선곡</Text>
        </DisabledMenuItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <DisabledMenuItem>
          <IconGift width={50} height={50} fill="black" />
          <Text>테이블 메세징</Text>
        </DisabledMenuItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress?.(MainMenuItem.주문목록)}>
        <MenuItem>
          <IconGame width={50} height={50} fill="black" />
          <Text>주문 목록</Text>
          <Text>(테스트)</Text>
        </MenuItem>
      </TouchableOpacity>
    </CircularMenu>
  );
}
export default MainMenu;
