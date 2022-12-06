import * as Location from "expo-location";

export const getUserLocation = (setRegion, setCurrentLocation) => {
  (async () => {
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
          // console.log(location);
          let coords = location.coords;
          setRegion({
            ...coords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setCurrentLocation({ ...coords });
        });
      }
    });
  })();
};
