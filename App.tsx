import "./firebase";
import "react-native-get-random-values";

import { AppProvider, LocaleProvider, SettingsProvider } from "./providers";

import { LogBox } from "react-native";
import React from "react";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./screens";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <LocaleProvider>
          <SettingsProvider>
            <AppProvider>
              <Screens />
            </AppProvider>
          </SettingsProvider>
        </LocaleProvider>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
