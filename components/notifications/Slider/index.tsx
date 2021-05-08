import { LayoutChangeEvent, ScrollView, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Indicator from "./Indicator";
import WebView from "react-native-webview";
import { useNotificationSummariesByStoreId } from "../../../hooks/notifications";

type Props = {
  storeId: string;
};

function Slider({ storeId }: Props) {
  const [value, setValue] = useState<number>(0);
  const [size, setSize] = useState<{ width: number; height: number }>();

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout;
    setSize({ width, height });
  }, []);

  const onScroll = useCallback(
    ({ nativeEvent }) => {
      if (size) {
        setValue(nativeEvent.contentOffset.x / size.width);
      } else {
        setValue(0);
      }
    },
    [size]
  );

  const notifications = useNotificationSummariesByStoreId(storeId);
  const injectedJavascript = `window.__store__ = {
    storeId: '${storeId}',
    operation: {
      openTime: ${Date.now() - 1000000},
      closeTime: ${Date.now() - 1000000},
    }
  }`;

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      {size && (
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        >
          {notifications.map((notification, index) => (
            <WebView
              key={index}
              style={{ ...size, backgroundColor: "transparent" }}
              source={{ html: notification.content as string }}
              injectedJavaScriptBeforeContentLoaded={injectedJavascript}
            />
          ))}
          {/* {children &&
            children.map((child, index) => (
              <View key={index} style={{ ...size }}>
                {child}
              </View>
            ))} */}
        </ScrollView>
      )}
      <View
        pointerEvents={"none"}
        style={{
          position: "absolute",
          top: 130,
          padding: 48,
          width: "100%",
        }}
      >
        <Indicator
          style={{ marginTop: 24, width: "80%", height: 4 }}
          value={value}
          steps={notifications.length}
        />
      </View>
    </View>
  );
}
export default Slider;
