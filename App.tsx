import "./firebase";
import "react-native-get-random-values";

import { LocaleProvider, StoreProvider, TableProvider } from "./providers";

import React from "react";
import { RecoilRoot } from "recoil";
import { Screens } from "./screens";

export default function App() {
  return (
    <RecoilRoot>
      <LocaleProvider>
        <StoreProvider>
          <TableProvider>
            <Screens />
          </TableProvider>
        </StoreProvider>
      </LocaleProvider>
    </RecoilRoot>
  );
}
