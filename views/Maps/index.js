import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapView, { Marker, Overlay } from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { FAB } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
const { InstantSearch, SearchBox, Hits, Highlight, Configure } = 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
const searchClient = instantMeiliSearch(
  "http://localhost:7700"
);


import api from "../../api/api";

const Maps = () => {
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: "Permission to access location was denied",
  //       });
  //       // setErrorMsg("Permission to access location was denied");
  //       return;
  //     } else {
  //       let location = await Location.getCurrentPositionAsync({});
  //       let coords = location.coords
  //       setmyLocation(coords);
  //       setRegion({...region, coords});
  //     }
  //   })();s
  // }, []);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [region, setRegion] = useState({
    latitude: 48.1351,
    longitude: 11.575,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [myLocation, setmyLocation] = useState({
    latitude: 48.1351,
    longitude: 11.575,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["stationLocations", region.latitude, region.longitude],
    queryFn: () =>
      api.stationLocations({
        latitude: region.latitude,
        longtitude: region.longitude,
      }),
    keepPreviousData: true,
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>An error has occurred: </Text>
      ) : (
        <View>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(region) => {
              setRegion(region);
              // console.log(region)
            }}
          >
            {data.locations.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                title={marker.name}
                description={marker.id}
              />
            ))}
          </MapView>
          <FAB
            icon="crosshairs-gps"
            style={styles.myLocationFAB}
            onPress={() => setRegion(myLocation)}
            // color="white"
          />
          {/* <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheet>  */}
        </View>
      )}
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  myLocationFAB: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});
