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

const SelectedLocationModal = ({ selectedLocation }) => {
  useEffect(() => {
    if (selectedLocation) {
      handlePresentLocationPress();
    }
    // console.log(selectedLocation);
  }, [selectedLocation]);

  const bottomSheetModalLocationRef = useRef(null);
  const { dismiss } = useBottomSheetModal();

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

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
          style={styles.container}
          indicatorStyle={styles.indicator}
        >
          <Text style={styles.title}>{location?.name}</Text>
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
