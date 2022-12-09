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
  BottomSheetFlatList,
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import ThreadBubble from "./ThreadBubble";
import { threadDummy } from "../../../api/api";
import MVVProduct from "./MVVProduct";

const SelectedLocationModal = ({
  selectedLocation,
  snapPoints,
  setSelectedLocation,
}) => {
  useEffect(() => {
    if (selectedLocation) {
      handlePresentLocationPress();
    }
    console.log(selectedLocation);
  }, [selectedLocation]);

  const bottomSheetModalLocationRef = useRef(null);
  const { dismiss } = useBottomSheetModal();

  // callbacks
  const handlePresentLocationPress = useCallback(() => {
    if (bottomSheetModalLocationRef.current) {
      bottomSheetModalLocationRef.current.present();
    }
  }, []);
  const handleDismissLocationPress = useCallback(() => {
    dismiss("Location");
    setSelectedLocation();
  }, [dismiss]);

  // renders
  const renderHeaderHandle = useCallback(
    (location) => (props) =>
      (
        <BottomSheetHandle
          style={styles.headerContainer}
          indicatorStyle={styles.indicator}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 16,
            }}
          >
            <Text style={styles.title}>{location?.name}</Text>
            <TouchableOpacity onPress={handleDismissLocationPress}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="close" size={18} color="#555555" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            {location?.products.map((product, index) => (
              <View key={index} style={{ paddingHorizontal: 5 }}>
                <MVVProduct product={"BUS"} />
              </View>
            ))}
          </View>
        </BottomSheetHandle>
      ),
    []
  );
  const renderBottomSheetContent = useCallback(
    (onPress, isLoading) => (
      // <ContactList type="FlatList" onItemPress={onPress} count={6} />
      <View style={styles.contentContainer}>
        <Button title="Modal Location" onPress={onPress} />
      </View>
    ),
    []
  );

  const renderFlatListItem = useCallback(({ item, index }) => (
    <ThreadBubble item={item} />
  ));
  return (
    <BottomSheetModal
      name="Location"
      ref={bottomSheetModalLocationRef}
      snapPoints={snapPoints}
      handleComponent={renderHeaderHandle(selectedLocation)}
      // children={renderBottomSheetContent(handleDismissLocationPress)}
    >
      <BottomSheetFlatList
        data={threadDummy.threads}
        renderItem={renderFlatListItem}
        contentContainerStyle={styles.container}
        // ListHeaderComponent={renderFlatListHeader}
      />
    </BottomSheetModal>
  );
};

export default SelectedLocationModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "rgba(0,0,0,0.075)",
    // zIndex: 99999,
  },
  headerContainer: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // justifyContent: "space-between",
    // flexDirection: "row",
  },
  title: {
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