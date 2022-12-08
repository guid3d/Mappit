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
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

const SelectedLocationModal = ({ selectedLocation, snapPoints }) => {
  useEffect(() => {
    if (selectedLocation) {
      handlePresentLocationPress();
    }
    // console.log(selectedLocation);
  }, [selectedLocation]);

  const bottomSheetModalLocationRef = useRef(null);
  const { dismiss } = useBottomSheetModal();

  // variables
  // const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handlePresentLocationPress = useCallback(() => {
    if (bottomSheetModalLocationRef.current) {
      bottomSheetModalLocationRef.current.present();
    }
  }, []);
  const handleDismissLocationPress = useCallback(() => {
    dismiss("Location");
  }, [dismiss]);

  // renders
  const renderHeaderHandle = useCallback(
    (location) => (props) =>
      (
        <BottomSheetHandle
          style={styles.headerContainer}
          indicatorStyle={styles.indicator}
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
              <Text>X</Text>
            </View>
          </TouchableOpacity>
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

  return (
    <BottomSheetModal
      name="Location"
      ref={bottomSheetModalLocationRef}
      snapPoints={snapPoints}
      handleComponent={renderHeaderHandle(selectedLocation)}
      // children={renderBottomSheetContent(handleDismissLocationPress)}
    />
  );
};

export default SelectedLocationModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "rgba(0,0,0,0.075)",
    zIndex: 99999,
  },
  headerContainer: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // justifyContent: "space-between",
    // flexDirection: "row",
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
