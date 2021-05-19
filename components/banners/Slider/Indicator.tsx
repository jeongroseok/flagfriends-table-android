import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

type SlideIndicatorPropsType = View["props"] & {
  value: number;
  steps: number;
};

export default function SlideIndicator({
  value,
  steps,
  style,
  ...otherProps
}: SlideIndicatorPropsType) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        outer: {
          backgroundColor: "black",
          opacity: 0.6,
          width: "100%",
          height: "100%",
        },
        inner: {
          position: "absolute",
          backgroundColor: "#FFFFFFFF",
          left: `${(1 / steps) * 100 * value}%`,
          width: `${(1 / steps) * 100}%`,
          height: "100%",
          opacity: 1,
        },
      }),
    [value, steps]
  );
  return (
    <View style={[style]} {...otherProps}>
      <View style={styles.outer} />
      <View style={styles.inner} />
    </View>
  );
}
