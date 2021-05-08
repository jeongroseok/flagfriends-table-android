import { Pressable, Text, TouchableOpacity } from "react-native";

import CircularMenu from "./CircularMenu";
import IconBill from "../../assets/ficon2.svg";
import IconCall from "../../assets/ficon9.svg";
import IconGame from "../../assets/ficon3.svg";
import IconGift from "../../assets/ficon4.svg";
import IconJukebox from "../../assets/ficon11.svg";
import IconLogo from "../../assets/ficon1.svg";
import IconOrder from "../../assets/ficon10.svg";
import React from "react";
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

type Props = { onLongPress?: () => void };
function MainMenu({ onLongPress }: Props) {
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
      <TouchableOpacity>
        <MenuItem>
          <IconCall width={50} height={50} fill="black" />
          <Text>직원 호출</Text>
        </MenuItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <MenuItem>
          <IconBill width={50} height={50} fill="black" />
          <Text>중간계산서 요청</Text>
        </MenuItem>
      </TouchableOpacity>
      <TouchableOpacity>
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
      <TouchableOpacity>
        <DisabledMenuItem>
          <IconGame width={50} height={50} fill="black" />
          <Text>술게임</Text>
        </DisabledMenuItem>
      </TouchableOpacity>
    </CircularMenu>
  );
}
export default MainMenu;
