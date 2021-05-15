import "./firebase";
import "react-native-get-random-values";

import { LocaleProvider, StoreProvider, TableProvider } from "./providers";

import React from "react";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./screens";
import { Text } from "react-native";
import { YellowBox } from "react-native";
import { useCommonSettings } from "./styles";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  const { fontsLoaded } = useCommonSettings();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <LocaleProvider>
          <StoreProvider>
            <TableProvider>
              <Screens />
            </TableProvider>
          </StoreProvider>
        </LocaleProvider>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
