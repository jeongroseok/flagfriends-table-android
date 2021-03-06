import { LayoutChangeEvent, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import BannerView from "../BannerView";
import { CenteredText } from "../../app";
import NavigationButton from "./NavigationButton";
import { useAvailableBanners } from "../../../hooks";

type Props = {};

function Slider({}: Props) {
  const [size, setSize] = useState<{ width: number; height: number }>();
  const banners = useAvailableBanners();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * banners.length));
  }, [banners, setIndex]);

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout;
    setSize({ width, height });
  }, []);

  if (banners.length <= 0) {
    return <CenteredText>등록된 배너 없음</CenteredText>;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      {size && banners[index] && (
        <BannerView
          style={{ ...size, backgroundColor: "transparent" }}
          banner={banners[index]}
        />
      )}
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <NavigationButton
            style={{ width: 64, height: 64, margin: 24 }}
            direction="LEFT"
            onPress={() => setIndex(Math.max(0, index - 1))}
          />
          <NavigationButton
            style={{ width: 64, height: 64, margin: 24 }}
            direction="RIGHT"
            onPress={() => setIndex(Math.min(banners.length - 1, index + 1))}
          />
        </View>
      </View>
    </View>
  );
}
export default Slider;
