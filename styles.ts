import {
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
  useFonts,
} from "@expo-google-fonts/noto-sans-kr";

import { StyleSheet } from "react-native";

const Colors = {
  fancygray: "#f1f1f1",
  gray: "#f4f4f4",
  lightGray: "#eaeaea",
  darkGray: "#131313",
  black: "black",
  white: "white",
  red: "#f3214e",
};

export const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  textLight: {
    fontFamily: "NotoSansKR_300Light",
    letterSpacing: -0.2,
  },
  textRegular: {
    fontFamily: "NotoSansKR_400Regular",
    letterSpacing: -0.2,
  },
  textBold: {
    fontFamily: "NotoSansKR_700Bold",
    letterSpacing: -0.2,
  },
  textExtraSmall: {
    fontSize: 12,
  },
  textTinySmall: {
    fontSize: 14,
  },
  textSmall: {
    fontSize: 16,
  },
  textNormal: {
    fontSize: 18,
  },
  textBig: {
    fontSize: 20,
  },
  textTinyBig: {
    fontSize: 22,
  },
  textFancyBig: {
    fontSize: 24,
  },
  textExtraBig: {
    fontSize: 28,
  },
  borderBottom: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  borderBottomBold: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
  },
});

export function useCommonSettings() {
  let [fontsLoaded] = useFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });
  return { fontsLoaded };
}

export { Colors };
