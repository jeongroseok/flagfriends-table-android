import { Colors, Styles } from "../../styles";
import { Image, SectionList, Text, View } from "react-native";
import {
  Product,
  useCurrencyCode,
  useLanguageCode,
  useProductCategoriesByParentId,
  useProductSummariesByCategoryIds,
} from "../../hooks";
import React, { useMemo } from "react";

import ListItem from "./ListItem";

const arrowTop = require("../../assets/arrow_top.png");

function SectionHeader({ section }: any) {
  return (
    <View
      style={{
        backgroundColor: Colors.gray,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
      }}
    >
      <Text
        style={[
          Styles.textNormal,
          {
            paddingVertical: 12,
            paddingHorizontal: 22,
            flex: 1,
          },
        ]}
      >
        {section.title}
      </Text>
      <Image
        style={{
          width: 44,
          height: 44,
          marginRight: 4,
          alignItems: "flex-end",
        }}
        source={arrowTop}
      />
      {/* <View style={{ backgroundColor: "red", width: 24, height: 24 }} /> */}
    </View>
  );
}

function ListFooter() {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 120,
        backgroundColor: Colors.fancygray,
      }}
    >
      <Text
        style={[
          Styles.textExtraSmall,
          Styles.textRegular,
          { lineHeight: 28, paddingTop: 18 },
        ]}
      >
        원산지 표기
      </Text>
      <Text
        style={[Styles.textExtraSmall, Styles.textLight, { lineHeight: 14 }]}
      >
        가래떡(외국산), 고추가루(국내산/중국산혼합), 어묵(수입산), 계란(국내산),
        치킨(국내산)
      </Text>
    </View>
  );
}

type Props = {
  categoryId: string;
  onProductPress: (id: string) => void;
};
export default function ({ categoryId, onProductPress }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const categories = useProductCategoriesByParentId(categoryId);
  const categoryLookup = useMemo(
    () =>
      Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories]
  );
  const { productSummaries } = useProductSummariesByCategoryIds(
    useMemo(() => categories.map((x) => x.id), [categories])
  );
  const sections = useMemo(() => {
    const sections: { [categoryId: string]: Product[] } = {};
    for (const product of productSummaries) {
      sections[product.categoryId] = sections[product.categoryId] || [];
      sections[product.categoryId].push(product);
    }
    return Object.entries(sections).map(([categoryId, productSummaries]) => ({
      title: categoryLookup[categoryId].name[languageCode],
      data: productSummaries,
    }));
  }, [productSummaries, categoryLookup]);

  return (
    <SectionList
      ListFooterComponent={ListFooter}
      style={{ backgroundColor: "white" }}
      sections={sections}
      renderItem={({ item, section }) => (
        <ListItem productSummary={item} onPress={onProductPress} />
      )}
      renderSectionHeader={SectionHeader}
    />
  );
}
