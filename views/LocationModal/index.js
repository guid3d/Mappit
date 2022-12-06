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
import {
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import MainModal from "./components/MainModal";
import SelectedLocationModal from "./components/SelectedLocationModal";

const LocationModal = ({ selectedLocation, currentLocation }) => {

  return (
    <View>
      <MainModal currentLocation={currentLocation} />
      <SelectedLocationModal selectedLocation={selectedLocation} />
    </View>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "rgba(0,0,0,0.075)",
    zIndex: 99999,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    // lineHeight: 20,
    // textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
});
