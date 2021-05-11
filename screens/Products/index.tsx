import { Colors, Styles } from "../../styles";
import { Text, View } from "react-native";
import {
  useLanguageCode,
  useRootProductCategoriesByStoreId,
  useStore,
} from "../../hooks";
import { useNavigation, useRoute } from "@react-navigation/native";

import { CategorizedList as ProductCategorizedList } from "../../components/products";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function ProductList() {
  const route = useRoute();
  const { storeId, categoryId } = route.params as any;
  return <ProductCategorizedList storeId={storeId} categoryId={categoryId} />;
}

function Products() {
  const languageCode = useLanguageCode();
  const { store } = useStore();
  const categories = useRootProductCategoriesByStoreId(store!.id);

  return (
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
      {categories.map(({ id, name }) => (
        <Tab.Screen
          key={id}
          name={name[languageCode]}
          initialParams={{ storeId: store!.id, categoryId: id }}
          component={ProductList}
        />
      ))}
      {!categories.length && <Tab.Screen name="loading" component={View} />}
    </Tab.Navigator>
  );
}

export default Products;
