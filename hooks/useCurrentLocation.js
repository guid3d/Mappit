import { View, Text } from "react-native";
import React, { useMemo, useState, useContext } from "react";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { CurrentRenderContext } from "@react-navigation/native";

const CurrentLocationContext = React.createContext();

export const CurrentLocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState();
  async () => {
    await Location.requestForegroundPermissionsAsync().then((response) => {
      if (response.status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Permission to access location was denied",
        });
        return;
      } else {
        Location.getCurrentPositionAsync().then((location) => {
          console.log(location);
          setCurrentLocation(location.coords);
        });
      }
    });
  };
  const value = useMemo(
    () => ({
      currentLocation,
    }),
    [CurrentRenderContext]
  );

  return (
    <CurrentLocationContext.Provider value={value}>
      {children}
    </CurrentLocationContext.Provider>
  );
};

export const useCurrentLocation = () => {
  return useContext(CurrentLocationContext);
};
