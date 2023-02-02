import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Maps from "../views/Maps";
import AddThread from "../views/AddThread";
import ReadThread from "../views/ReadThread";
import AddComment from "../views/AddComment";
import Search from "../views/Search";

import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const generateDeviceUniqueID = async () => {
  let uuid = uuidv4();
  await SecureStore.getItemAsync("secure_deviceid").then((fetchUUID) => {
    if (fetchUUID) {
      uuid = fetchUUID;
      console.log("getStoreDeviceID: ", JSON.parse(uuid));
    } else {
      SecureStore.setItemAsync("secure_deviceid", JSON.stringify(uuid)).then(
        () => {
          console.log("setNewDeviceID: ", uuid);
        }
      );
    }
  });
};

const MainStackView = () => {
  useEffect(() => {
    generateDeviceUniqueID();
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          component={Maps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddThread"
          component={AddThread}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="ReadThread" component={ReadThread} />
        <Stack.Screen
          name="AddComment"
          component={AddComment}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackView;
