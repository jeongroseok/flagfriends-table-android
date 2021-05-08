import React, { useMemo } from "react";
import { SectionList, Text } from "react-native";
import { useCurrencyCode, useLanguageCode } from "../../hooks";

type Props = { storeId: string };
export default function ({ storeId }: Props) {
  const languageCode = useLanguageCode();
  const currencyCode = useCurrencyCode();
  //   const products = useAllProductSummariesByStoreId(storeId);
  //   const sections = useMemo(() => {}, [storeId]);
  return (
    // <SectionList
    //   //   ListFooterComponent={ProductListFooter}
    //   style={{ backgroundColor: "white" }}
    //   sections={sections}
    //   renderItem={({ item }) => (
    //     <Text>item</Text>
    //     // <ProductListItem item={item} onItemPress={onItemPress} />
    //   )}
    //   //   renderSectionHeader={ProductListSectionHeader}
    // />
    <Text>Product List</Text>
  );
}
