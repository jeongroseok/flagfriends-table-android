import "./firebase";
import "react-native-get-random-values";

import { AppProvider, LocaleProvider, SettingsProvider } from "./providers";
import React, { useEffect } from "react";

import { LogBox } from "react-native";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screens } from "./screens";
import firebase from "firebase";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  // 수원점 업그레이드 하고 아래 코드 실행 하기, productCategory에 order field 제거 코드임
  // useEffect(() => {
  //   (async () => {
  //     const snapshot = await firebase
  //       .firestore()
  //       .collection("productCategories")
  //       .get();
  //     await Promise.all(
  //       snapshot.docs.map((doc) =>
  //         doc.ref.update({ order: firebase.firestore.FieldValue.delete() })
  //       )
  //     );
  //     alert("doen");
  //   })();
  // }, []);
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
