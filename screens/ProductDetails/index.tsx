import {
  CenteredText,
  Overlapping,
  QuantitySelector,
} from "../../components/app";
import { Colors, Styles } from "../../styles";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrencyCode, useLanguageCode, useProductById } from "../../hooks";
import { useNavigation, useRoute } from "@react-navigation/native";

import DescriptionSection from "./DescriptionSection";
import PriceSection from "./PriceSection";
import Section from "./Section";
import { useCart } from "../../hooks/carts";
import { useRecoilState } from "recoil";

// import SecondaryOptionSelector from "./SecondaryOptionSelector";

// import { cartState } from "../../states";
const iconNotice = require("../../assets/icon_notice.png");
const thumbDefault = require("../../assets/thumbDefault.png");
// import { useProduct } from "../../hooks";

function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addItem } = useCart();

  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const { width } = useWindowDimensions();
  const product = useProductById((route.params as any).productId);
  const [options, setOptions] = useState();
  const [primaryOption, setPrimaryOption] = useState();
  const [secondaryOptions, setSecondaryOptions] = useState();
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);

  const detailImage = useMemo(() => {
    if (!product?.media?.detail) return thumbDefault;
    return { uri: product.media.detail };
  }, [product]);
  // const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    if (!product) {
      return;
    }

    // set navigation title
    navigation.setOptions({
      title: product.name[languageCode],
    });

    // map options
    // setOptions(
    //   product?.options?.map((option, index) => ({
    //     index,
    //     type: option.type,
    //     title: option.title,
    //     values: option.items.map(({ text }) => text),
    //     selectedIndex: 0,
    //   }))
    // );
  }, [product]);
  // useEffect(() => {
  //   // primary option
  //   const _primaryOption = options?.filter(
  //     (option) => option.type === "PREMARY"
  //   )[0];
  //   setPrimaryOption(_primaryOption);

  //   // secondary options
  //   const _secondaryOptions = options?.filter(
  //     (option) => option.type !== "PREMARY"
  //   );
  //   setSecondaryOptions(_secondaryOptions);
  // }, [options]);

  const handleAddToCart = useCallback(() => {
    addItem({ productId: product!.id, optionSelections: {}, quantity });
    navigation.goBack();
  }, [product, quantity, options]);

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <View style={{ width, height: width }}>
        <Image
          width={width}
          height={width}
          style={{ width, height: width }}
          onLoadEnd={() => setImageLoading(false)}
          source={detailImage}
        />
        {imageLoading && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <CenteredText>이미지 불러오는 중</CenteredText>
          </View>
        )}
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        <View
          style={{
            marginTop: width,
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 36,
          }}
        >
          <DescriptionSection description={product.description[languageCode]} />
          <PriceSection price={product.price} />
          {/* {primaryOption && (
            <Section title={primaryOption.title}>
              <OptionSelector
                values={primaryOption.values}
                selectedIndex={primaryOption.selectedIndex}
                onChange={(selectedIndex) =>
                  handleOptionChange(0, selectedIndex)
                }
              />
            </Section>
          )} */}

          <Section title="수량">
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </Section>
          {/* 
          {secondaryOptions &&
            secondaryOptions.map((option, index) => (
              <Section key={index} title={option.title}>
                <SecondaryOptionSelector
                  type={option.type}
                  values={option.values}
                  selectedIndex={option.selectedIndex}
                  onChange={(selectedIndex) =>
                    handleOptionChange(option.index, selectedIndex)
                  }
                />
              </Section>
            ))} */}

          <View
            style={{
              padding: 30,
              backgroundColor: Colors.fancygray,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 20, height: 20 }} source={iconNotice} />
              <Text
                style={[
                  Styles.textTinySmall,
                  Styles.textRegular,
                  {
                    textAlign: "center",
                    paddingLeft: 6,
                    lineHeight: 19,
                  },
                ]}
              >
                메뉴 사진은 실제 조리 음식과 다소 다를 수 있습니다.
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleAddToCart}
              style={{
                width: 192,
                height: 64,
                marginTop: 32,
                borderRadius: 32,
                backgroundColor: "#1E2326",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[Styles.textNormal, { color: "white" }]}>
                장바구니
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default ProductDetails;
