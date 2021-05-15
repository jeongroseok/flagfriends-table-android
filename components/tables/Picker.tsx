import { Picker as RNPicker } from "@react-native-picker/picker";
import React from "react";
import { useAllTableSummariesByStoreId } from "../../hooks";

type Props = {
  storeId: string;
  selectedValue?: string;
  onValueChange?: (id: string) => void;
};
function Picker({ storeId, selectedValue, onValueChange }: Props) {
  const { tableSummaries } = useAllTableSummariesByStoreId(storeId);
  return (
    <RNPicker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => onValueChange?.(itemValue)}
    >
      <RNPicker.Item label="미선택" value={undefined} />
      {tableSummaries.map(({ id, name }) => (
        <RNPicker.Item key={id} label={name} value={id} />
      ))}
    </RNPicker>
  );
}

export default Picker;
