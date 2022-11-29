import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const Maps = () => {
  const [region, setRegion] = useState({
    latitude: 48.1351,
    longitude: 11.575,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData", region.latitude, region.longitude],
    queryFn: () =>
      api.stationLocations({
        latitude: region.latitude,
        longtitude: region.longitude,
      }),
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
          {/* <Button title="Press me" onPress={() => {console.log(data)}} /> */}
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
});
