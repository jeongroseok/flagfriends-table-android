import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Picker as TablePicker,
  SummaryText as TableSummaryText,
} from "../../components/tables";
import {
  useLanguageCode,
  useStore,
  useStoreProvider,
  useStoreSelector,
  useTable,
} from "../../hooks";

import { Picker as StorePicker } from "../../components/stores";

function Preferences() {
  const languageCode = useLanguageCode();
  const {
    store,
    loading: storeLoading,
    error,
    changeStore,
  } = useStoreSelector();
  const { table, loading: tableLoading, changeTable } = useTable();
  const loading = storeLoading || tableLoading;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const storeId = store?.id;
  const tableId = table?.id;

  return (
    <View>
      <Text>Select Store (selectedStoreId: {storeId})</Text>
      <StorePicker selectedValue={storeId} onValueChange={changeStore} />
      {storeId && (
        <>
          <Text>Select Table (selectedTableId: {tableId})</Text>
          <TablePicker
            storeId={storeId}
            selectedValue={tableId}
            onValueChange={(id) => changeTable?.({ id })}
          />
          {tableId && <TableSummaryText />}
          {/* {tableId && (
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: "blue",
                  padding: 32,
                  textAlign: "center",
                }}
                onPress={async () => {
                  alert("done");
                }}
              >
                저장
              </Text>
            </TouchableOpacity>
          )} */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f100",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Preferences;
