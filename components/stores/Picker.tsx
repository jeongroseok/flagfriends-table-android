import { useLanguageCode, useStoreSummaries } from "../../hooks";

import { Picker as RNPicker } from "@react-native-picker/picker";
import React from "react";

type Props = {
  selectedValue?: string;
  onValueChange?: (id: string) => void;
};
function Picker({ selectedValue, onValueChange }: Props) {
  const languageCode = useLanguageCode();
  const { storeSummaries } = useStoreSummaries();

  return (
    <RNPicker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => onValueChange?.(itemValue)}
    >
      <RNPicker.Item label={"미선택"} value={undefined} />
      {storeSummaries.map(({ id, name }) => (
        <RNPicker.Item key={id} label={name[languageCode]} value={id} />
      ))}
    </RNPicker>
  );
}

export default Picker;
