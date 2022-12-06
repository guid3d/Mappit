import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, { Marker, Overlay } from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { FAB } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import api, { stationDummy } from "../../api/api";
import { getUserLocation } from "./components/GetUserLocation";
import LocationModal from "../LocationModal";

const Maps = () => {
  useEffect(() => {
    // This will start the app with user location, but have to handle it faster
    getUserLocation(setRegion, setCurrentLocation);
  }, []);
  const [currentLocation, setCurrentLocation] = useState();
  const [region, setRegion] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <BottomSheetModalProvider>
      {region && currentLocation ? (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(region) => {
              // setRegion(region);
              // console.log(region)
            }}
            showsUserLocation
            // showsMyLocationButton
            // followsUserLocation
          >
            {stationDummy.locations.map((marker, index) => (
              <Marker
                key={index}
                // image={markerPng}
                coordinate={marker}
                title={marker.name}
                description={marker.id}
                onPress={() => {
                  setSelectedLocation(marker);
                  console.log(marker);
                }}
              >
                <View style={styles.marker} />
              </Marker>
            ))}
          </MapView>
          {/* <FAB
            icon={"crosshairs-gps"}
            style={styles.myLocationFAB}
            // onPress={refetch}
            // color="white"
          /> */}
          <LocationModal
            selectedLocation={selectedLocation}
            currentLocation={currentLocation}
            // isLoading={isInitialLoading}
            // closedByStationData={data}
          />
        </View>
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      )}
    </BottomSheetModalProvider>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  myLocationFAB: {
    position: "absolute",
    margin: 30,
    right: 0,
    top: 0,
    backgroundColor: "#fff",
  },
  marker: {
    width: 10,
    height: 10,
    backgroundColor: "blue",
    borderRadius: 10,
  },
});
