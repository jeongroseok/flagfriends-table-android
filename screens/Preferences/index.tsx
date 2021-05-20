import { Button, View } from "react-native";

import React from "react";
import { SummaryText as TableSummaryText } from "../../components/tables";
import { useSettings } from "../../hooks";

function Preferences() {
  const { reset, loading } = useSettings();
  return (
    <View>
      {!loading && <TableSummaryText />}
      <Button
        title="초기화"
        onPress={() => {
          reset();
        }}
      />
    </View>
  );
}

export default Preferences;
