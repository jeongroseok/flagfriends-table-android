import { Text, View } from "react-native";

import React from "react";

type Props = Text["props"];
function CenteredText(props: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      <Text {...props} style={{ textAlign: "center" }} />
    </View>
  );
}
export default CenteredText;
