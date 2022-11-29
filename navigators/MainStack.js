import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Maps from "../views/Maps";
import ThreadList from "../views/ThreadList";

const MainStackView = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Maps} />
        <Tab.Screen name="ThreadList" component={ThreadList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainStackView;
