import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "./stores";
import { Table } from "./tables";

interface Settings {
  storeId: Store["id"] | undefined;
  tableId: Table["id"] | undefined;
}

const DefaultSettings: Settings = {
  storeId: undefined,
  tableId: undefined,
};

type SettingsContext = {
  settings: Settings;
  change: (settings: Settings) => Promise<void>;
  reset: () => Promise<void>;
  loading: boolean;
};

export const SettingsContext = createContext<SettingsContext>({
  settings: DefaultSettings,
  change: async () => {},
  reset: async () => {},
  loading: true,
});

const SettingsKey = "appSettings";

export function useSettingsProvider() {
  const [settings, setSettings] = useState<Settings>();
  const [loading, setLoading] = useState(true);

  const change = useCallback(
    async (settings: Settings) => {
      setLoading(true);
      await AsyncStorage.setItem(SettingsKey, JSON.stringify(settings));
      setSettings(settings);
      setLoading(false);
    },
    [setLoading, setSettings]
  );

  const reset = useCallback(async () => {
    setLoading(true);
    setSettings(undefined);
    await AsyncStorage.removeItem(SettingsKey);
    setLoading(false);
  }, [setLoading, setSettings]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const json = await AsyncStorage.getItem(SettingsKey);
      const settings = (json && JSON.parse(json)) || DefaultSettings;
      setSettings(settings);
      setLoading(false);
    })();
  }, [setLoading, setSettings]);

  return {
    settings: settings || DefaultSettings,
    change,
    reset,
    loading,
  };
}

export function useSettings() {
  return useContext(SettingsContext);
}
