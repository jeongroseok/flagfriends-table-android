import { StyleSheet, View } from "react-native";

import React from "react";

export default class Overlapping extends React.Component<any> {
  render() {
    const { style, ...rest } = this.props as any;
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
            ...StyleSheet.flatten(style),
          },
        ]}
        {...rest}
      />
    );
  }
}
