import { Banner } from "../../firebase/banners";
import React from "react";
import WebView from "react-native-webview";
import { useTable } from "../../hooks";

type Props = {
  banner: Banner;
} & WebView["props"];
function BannerView({ banner, ...props }: Props) {
  const table = useTable();
  const injectedJavascript = `window.__app__ = ${JSON.stringify({
    storeId: banner.storeId,
    tableId: table.id,
    bannerId: banner.id,
  })}`;

  const source = banner.content.uri
    ? { uri: banner.content.uri }
    : { html: banner.content.html! };

  return (
    <WebView
      {...props}
      injectedJavaScriptBeforeContentLoaded={injectedJavascript}
      source={source}
    />
  );
}
export default BannerView;
