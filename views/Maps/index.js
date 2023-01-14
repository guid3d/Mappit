import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
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
import Modal from "../Modal";
import { MeiliSearch } from 'meilisearch';
import { SearchBar } from 'react-native-elements';

const client = new MeiliSearch({
  host: 'http://34.65.82.213',
  apiKey: 'MAPPIT',
});
const index = client.index('threads')

const Maps = () => {
  useEffect(() => {
    // This will start the app with user location, but have to handle it faster
    getUserLocation(setRegion, setCurrentLocation);
  }, []);
  const [currentLocation, setCurrentLocation] = useState();
  const [region, setRegion] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const markerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    const results = await index.search(text);
    setSearchResults(results.hits);
  }
  return (
    <BottomSheetModalProvider>
      {region && currentLocation ? (
        <View style={styles.container}>
          <SearchBar 
            placeholder="Search in threads..." 
            onChangeText={handleSearch} 
            value={query} 
          />
          {searchResults.length > 0 && (
            <View>
              {searchResults.map((result, index) => (
                <Text key={index}>{result}</Text>
              ))}
            </View>
          )}
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
            // ref={mapRef}
            onPress={() => {
              Keyboard.dismiss();
              setSearchResults([]);
            }}          
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
                ref={markerRef}
              >
                <View style={styles.marker} />
              </Marker>
            ))}
          </MapView>
          {/* <FAB
            icon={"crosshairs-gps"}
            style={styles.myLocationFAB}
            // onPress={() => {}}
            // color="white"
          /> */}
          <Modal
            selectedLocation={selectedLocation}
            currentLocation={currentLocation}
            setSelectedLocation={setSelectedLocation}
            markerRef={markerRef}
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
    width: 5,
    height: 5,
    backgroundColor: "blue",
    borderRadius: 10,
  },
});
