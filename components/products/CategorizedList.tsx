import { Colors, Styles } from "../../styles";
import { Image, SectionList, Text, View } from "react-native";
import {
  Product,
  useCurrencyCode,
  useLanguageCode,
  useProductCategoriesByParentId,
  useProducts,
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
      {/* <Text
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
      </Text> */}
    </View>
  );
}

type Props = {
  categoryId: string;
  onProductPress: (id: string) => void;
};
type Section = { [categoryId: string]: Product[] };
function CategorizedList({ categoryId, onProductPress }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const categories = useProductCategoriesByParentId(categoryId);
  const products = useProducts();
  const sections = useMemo(() => {
    // 카테고리ID로 카테고리 객체를 찾기 위한 룩업 테이블
    const categoryLookup = Object.fromEntries(
      categories.map((category) => [category.id, category])
    );
    const categoryIds = categories.map(({ id }) => id);
    const sections: Section = {};

    for (const product of products) {
      if (!categoryIds.includes(product.categoryId)) continue;
      sections[product.categoryId] = sections[product.categoryId] || [];
      sections[product.categoryId].push(product);
    }

    return Object.entries(sections)
      .map(([categoryId, products]) => ({
        title: categoryLookup[categoryId].name[languageCode],
        order: categoryLookup[categoryId].order,
        data: products,
      }))
      .sort((pc1, pc2) => pc1.order - pc2.order);
  }, [categories, products]);

  return (
    <SectionList
      ListFooterComponent={ListFooter}
      style={{ backgroundColor: "white" }}
      sections={sections}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item, section }) => (
        <ListItem productSummary={item} onPress={onProductPress} />
      )}
      renderSectionHeader={SectionHeader}
    />
  );
}
export default CategorizedList;
