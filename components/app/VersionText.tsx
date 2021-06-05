import React from "react";
import { Text } from "react-native";

function VersionText(props: Text["props"]) {
  return (
    <Text {...props} style={[props.style, { fontSize: 11 }]}>
      updated at 2021-06-06
    </Text>
  );
}

export default VersionText;
