import { Colors, Styles } from "../../styles";
import { Dimensions, Text, View } from "react-native";
import React, { useState } from "react";
import {
  useLanguageCode,
  useRootProductCategoriesByStoreId,
  useStore,
} from "../../hooks";
import { useNavigation, useRoute } from "@react-navigation/native";

import { BottomSheet as CartBottomSheet } from "../../components/carts";
import { CategorizedList as ProductCategorizedList } from "../../components/products";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function ProductList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { storeId, categoryId } = route.params as any;
  return (
    <ProductCategorizedList
      categoryId={categoryId}
      onProductPress={(id) =>
        navigation.navigate("productDetails", { productId: id })
      }
    />
  );
}
const renderContent = () => (
  <View
    style={{
      backgroundColor: "white",
      padding: 16,
      height: 450,
    }}
  >
    <Text>Swipe down to close</Text>
  </View>
);
function Products() {
  const navigation = useNavigation();
  const languageCode = useLanguageCode();
  const store = useStore();
  const { productCategories, loading } = useRootProductCategoriesByStoreId(
    store.id
  );

  if (loading || productCategories.length <= 0) {
    return <Text>loading</Text>;
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
        {productCategories.map(({ id, name }) => (
          <Tab.Screen
            key={id}
            name={name[languageCode]}
            initialParams={{ storeId: store.id, categoryId: id }}
            component={ProductList}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

export default Products;
