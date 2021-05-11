import { Colors, Styles } from "../../styles";
import { Text, View } from "react-native";

import React from "react";

type Props = {
  title: string;
  children: any;
};
function Section({ title, children }: Props) {
  return (
    <View>
      <Text
        style={[
          Styles.textTinySmall,
          Styles.textRegular,
          {
            textAlign: "center",
            backgroundColor: Colors.fancygray,
          },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
export default Section;
