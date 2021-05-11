import {
  Product,
  useCurrencyCode,
  useLanguageCode,
  useProductCategoriesByParentId,
  useProductSummariesByCategoryIds,
} from "../../hooks";
import React, { useMemo } from "react";
import { SectionList, Text } from "react-native";

import ListItem from "./ListItem";

type Props = { storeId: string; categoryId: string };
export default function ({ storeId, categoryId }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  const categories = useProductCategoriesByParentId(categoryId);
  const categoryLookup = useMemo(
    () =>
      Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories]
  );
  const products = useProductSummariesByCategoryIds(
    useMemo(() => categories.map((x) => x.id), [categories])
  );
  const sections = useMemo(() => {
    const sections: { [categoryId: string]: Product[] } = {};
    for (const product of products) {
      sections[product.categoryId] = sections[product.categoryId] || [];
      sections[product.categoryId].push(product);
    }
    return Object.entries(sections).map(([categoryId, products]) => ({
      title: categoryLookup[categoryId].name[languageCode],
      data: products,
    }));
  }, [products, categoryLookup]);

  return (
    <SectionList
      //   ListFooterComponent={ProductListFooter}
      style={{ backgroundColor: "white" }}
      sections={sections}
      renderItem={({ item, section }) => (
        <ListItem productSummary={item} onPress={() => {}} />
        // <Text>
        //   {section.title}:{name[languageCode]}, {price[currencyCode]}
        // </Text>
        // <ProductListItem item={item} onItemPress={onItemPress} />
      )}
      //   renderSectionHeader={ProductListSectionHeader}
    />
  );
}
