import * as React from "react";

import Svg, { Path, SvgProps } from "react-native-svg";

import { TouchableOpacity } from "react-native-gesture-handler";

function LeftArrow(props: SvgProps) {
  return (
    <Svg viewBox="0 0 59.414 59.414" width="100%" height="100%" {...props}>
      <Path
        d="M45.268 1.414L43.854 0 14.146 29.707l29.708 29.707L45.268 58 16.975 29.707z"
        fill="currentColor"
      />
    </Svg>
  );
}

function RightArrow(props: SvgProps) {
  return (
    <Svg viewBox="0 0 59.414 59.414" width="100%" height="100%" {...props}>
      <Path
        d="M15.561 0l-1.415 1.414 28.293 28.293L14.146 58l1.415 1.414 29.707-29.707z"
        fill="currentColor"
      />
    </Svg>
  );
}
type Props = TouchableOpacity["props"] & {
  direction?: "RIGHT" | "LEFT";
};

function NavigationButton({ direction, ...props }: Props) {
  return (
    <TouchableOpacity {...props}>
      {direction === "LEFT" ? (
        <LeftArrow color="black" />
      ) : (
        <RightArrow color="black" />
      )}
    </TouchableOpacity>
  );
}

export default NavigationButton;
