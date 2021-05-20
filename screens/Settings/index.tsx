import { Text, View } from "react-native";

import { CenteredText } from "../../components/app";
import React from "react";
import { Picker as StorePicker } from "../../components/stores";
import { Picker as TablePicker } from "../../components/tables";
import { useSettings } from "../../hooks";

function Settings() {
  const { settings, loading, change } = useSettings();

  if (loading) {
    return <CenteredText>로딩 중...</CenteredText>;
  }

  return (
    <View>
      <Text>Select Store (selectedStoreId: {settings.storeId})</Text>
      <StorePicker
        selectedValue={settings.storeId}
        onValueChange={(storeId) => change({ ...settings, storeId })}
      />
      {settings.storeId && (
        <>
          <Text>Select Table (selectedTableId: {settings.tableId})</Text>
          <TablePicker
            storeId={settings.storeId}
            selectedValue={settings.tableId}
            onValueChange={(tableId) => change({ ...settings, tableId })}
          />
        </>
      )}
    </View>
  );
}

export default Settings;
