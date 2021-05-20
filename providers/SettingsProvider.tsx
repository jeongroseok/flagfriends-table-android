import { SettingsContext, useSettingsProvider } from "../hooks";

import React from "react";

function SettingsProvider({ children }: React.Component["props"]) {
  const value = useSettingsProvider();

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
