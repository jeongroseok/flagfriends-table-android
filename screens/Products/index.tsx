import { Colors, Styles } from "../../styles";
import { useLanguageCode, useRootProductCategories } from "../../hooks";
import { useNavigation, useRoute } from "@react-navigation/native";

import { BottomSheet as CartBottomSheet } from "../../components/carts";
import { CenteredText } from "../../components/app";
import { CategorizedList as ProductCategorizedList } from "../../components/products";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function ProductList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params as any;
  return (
    <ProductCategorizedList
      categoryId={categoryId}
      onProductPress={(id) =>
        navigation.navigate("productDetails", { productId: id })
      }
    />
  );
}

function Products() {
  const languageCode = useLanguageCode();
  const productCategories = useRootProductCategories();

  if (productCategories.length <= 0) {
    return <CenteredText>카테고리가 설정되지 않음</CenteredText>;
  }

  return (
    <>
      <CartBottomSheet />
      <Tab.Navigator
        style={{ flex: 1 }}
        tabBarOptions={{
          activeTintColor: Colors.black,
          inactiveTintColor: "gray",
          labelStyle: [Styles.textNormal],
          tabStyle: {
            height: 60,
          },
          style: {
            elevation: 0,
          },
          indicatorStyle: {
            backgroundColor: Colors.black,
          },
        }}
      >
        {productCategories
          .sort((pc1, pc2) => pc1.order - pc2.order)
          .map(({ id, name }) => (
            <Tab.Screen
              key={id}
              name={name[languageCode]}
              initialParams={{ categoryId: id }}
              component={ProductList}
            />
          ))}
      </Tab.Navigator>
    </>
  );
}

export default Products;
