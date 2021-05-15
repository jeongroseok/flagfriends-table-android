import { Colors, Styles } from "../../styles";
import {
  Directions,
  FlingGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Text, TouchableOpacity, View } from "react-native";
import {
  useLanguageCode,
  useRootProductCategoriesByStoreId,
  useStore,
} from "../../hooks";
import { useNavigation, useRoute } from "@react-navigation/native";

import Cart from "./Cart";
import { Overlapping } from "../../components/app";
import { CategorizedList as ProductCategorizedList } from "../../components/products";
import React from "react";
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

function Products() {
  const navigation = useNavigation();
  const languageCode = useLanguageCode();
  const store = useStore();
  const categories = useRootProductCategoriesByStoreId(store.id);

  return (
    <>
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
            initialParams={{ storeId: store.id, categoryId: id }}
            component={ProductList}
          />
        ))}
        <Tab.Screen name="cart" component={Cart} />
      </Tab.Navigator>

      <Overlapping style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <FlingGestureHandler
          direction={Directions.UP}
          onHandlerStateChange={({ nativeEvent: { oldState } }) =>
            oldState == State.ACTIVE && alert("up")
          }
        >
          <View>
            <View style={{ backgroundColor: "red", width: 100, height: 30 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate("cart")}
              style={{
                width: 192,
                height: 64,
                margin: 10,
                borderRadius: 32,
                backgroundColor: "#1E2326",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[Styles.textNormal, { color: "white" }]}>
                주문하기
              </Text>
            </TouchableOpacity>
          </View>
        </FlingGestureHandler>
      </Overlapping>
    </>
  );
}

export default Products;
