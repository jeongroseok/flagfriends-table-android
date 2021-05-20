import { Text, View } from "react-native";

import React from "react";

type Props = {
  text: string;
};
function CenteredText({ text }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <Text style={{ textAlign: "center" }}>{text}</Text>
    </View>
  );
}
export default CenteredText;
