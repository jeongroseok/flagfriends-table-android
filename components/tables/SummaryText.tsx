import { Table, useLanguageCode, useTable } from "../../hooks";
import { Text, View } from "react-native";

import React from "react";

type Props = {};
function SummaryText({}: Props) {
  const languageCode = useLanguageCode();
  const table = useTable();
  return (
    <View>
      <Text>테이블 이름:</Text>
      <Text>{table.name}</Text>
      <Text>테이블 설명:</Text>
      <Text>{table.description[languageCode]}</Text>
      <Text>테이블 상태:</Text>
      <Text>{table.status}</Text>
    </View>
  );
}

export default SummaryText;
