import { StyleSheet, Text, View } from "react-native";
import { useStoreSelector, useTableSelector } from "../../hooks";

import React from "react";
import { Picker as StorePicker } from "../../components/stores";
import { Picker as TablePicker } from "../../components/tables";

function Landing() {
  const { store, loading: storeLoading, changeStore } = useStoreSelector();
  const { table, loading: tableLoading, changeTable } = useTableSelector();
  const loading = storeLoading || tableLoading;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Select Store (selectedStoreId: {store?.id})</Text>
      <StorePicker selectedValue={store?.id} onValueChange={changeStore} />
      {!storeLoading && store && (
        <>
          <Text>Select Table (selectedTableId: {table?.id})</Text>
          <TablePicker
            storeId={store.id}
            selectedValue={table?.id}
            onValueChange={changeTable}
          />
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

export default Landing;
