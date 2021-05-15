import { Button, View } from "react-native";
import { useStoreSelector, useTableSelector } from "../../hooks";

import React from "react";
import { SummaryText as TableSummaryText } from "../../components/tables";

function Preferences() {
  const { changeStore } = useStoreSelector();
  const { table, loading, changeTable } = useTableSelector();
  return (
    <View>
      {!loading && table && <TableSummaryText />}
      <Button
        title="초기화"
        onPress={() => {
          changeStore(undefined);
          changeTable(undefined);
        }}
      />
    </View>
  );
}

export default Preferences;
