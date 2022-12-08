import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import MainModal from "./components/MainModal";
import SelectedLocationModal from "./components/SelectedLocationModal";

const LocationModal = ({
  selectedLocation,
  currentLocation,
  setSelectedLocation,
  markerRef
}) => {
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  return (
    <View>
      <MainModal
        currentLocation={currentLocation}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        snapPoints={snapPoints}
        markerRef={markerRef}
      />
      <SelectedLocationModal
        selectedLocation={selectedLocation}
        currentLocation={currentLocation}
        snapPoints={snapPoints}
      />
    </View>
  );
};

export default LocationModal;
