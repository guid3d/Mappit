import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Maps from "../views/Maps";
import ThreadList from "../views/ThreadList";

const MainStackView = () => {
  // const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* <Tab.Navigator>
        <Tab.Screen name="Map" component={Maps} />
        <Tab.Screen name="ThreadList" component={ThreadList} />
      </Tab.Navigator> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          component={Maps}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackView;
