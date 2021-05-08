import React, { ReactNode, createContext } from "react";

interface Settings {
  currencyCode: string;
  languageCode: string;
  regionCode: string;
}
const defaultSettings: Settings = {
  currencyCode: "krw",
  languageCode: "ko",
  regionCode: "kr",
};

export const LocaleContext = createContext<Settings>(defaultSettings);

type Props = {
  children: ReactNode;
};
function LocaleProvider({ children }: Props) {
  // TODO: load from localStorage, when localStorage is empty.

  return (
    <LocaleContext.Provider value={{ ...defaultSettings }}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleProvider;
