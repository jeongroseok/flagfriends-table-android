import PropTypes from "prop-types";
import React from "react";
import { Styles } from "../../styles";
import { Text } from "react-native";

type Props = {
  description: string;
};
function DescriptionSection({ description }: Props) {
  return (
    <Text
      style={[
        Styles.textSmall,
        Styles.textRegular,
        { marginTop: 24, marginBottom: 6, textAlign: "center" },
      ]}
    >
      {description}
    </Text>
  );
}
export default DescriptionSection;
