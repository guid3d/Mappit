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
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

const MainModal = ({ currentLocation }) => {
  useEffect(() => {
    // handlePresentMainPress();
    bottomSheetModalMainRef.current.present();
    // console.log(currentLocation);
  }, []);

  const { isFetching, isLoading, error, data, isInitialLoading, refetch } =
    useQuery({
      queryKey: [
        "stationLocations",
        currentLocation.latitude,
        currentLocation.longitude,
      ],
      queryFn: () =>
        api.stationLocations({
          latitude: currentLocation.latitude,
          longtitude: currentLocation.longitude,
        }),
      // keepPreviousData: true,
      // enabled: false,
      // onSuccess: (data) => {
      //   console.log(data);
      // },
    });

  // refs
  const bottomSheetModalMainRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  // callbacks
  const handlePresentMainPress = useCallback(() => {
    if (bottomSheetModalMainRef.current) {
      bottomSheetModalMainRef.current.present();
    }
  }, []);
  const handleDismissMainPress = useCallback(() => {
    if (bottomSheetModalMainRef.current) {
      bottomSheetModalMainRef.current.dismiss();
    }
  }, []);

  // renders
  const renderHeaderHandle = useCallback(
    (title) => (props) =>
      (
        <BottomSheetHandle
          style={styles.container}
          indicatorStyle={styles.indicator}
        >
          <Text style={styles.title}>{title}</Text>
        </BottomSheetHandle>
      ),
    []
  );

  // const renderItem = useCallback(
  //   ({ item }) => (
  //     <View style={styles.stationList}>
  //       <Text style={styles.stationListText}>{item.name}</Text>
  //     </View>
  //   ),
  //   []
  // );
  const renderBottomSheetContent = () => (
    // <ContactList type="FlatList" onItemPress={onPress} count={6} />
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        // <BottomSheetFlatList
        //   data={data?.locations}
        //   keyExtractor={(i) => i.id}
        //   renderItem={renderItem}
        // />
        <View>
          {data?.locations.map((station, index) => (
            <View key={index} style={styles.stationList}>
              <Text style={styles.stationListText}>{station.name}</Text>
            </View>
          ))}
          <Button title="Modal Location" />
        </View>
      )}
    </View>
  );
  return (
    <BottomSheetModal
      name="Main"
      ref={bottomSheetModalMainRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleComponent={renderHeaderHandle("Nearby Stations")}
      children={renderBottomSheetContent}
    />
  );
};

export default MainModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "rgba(0,0,0,0.075)",
    // zIndex: 99999,
  },
  title: {
    marginTop: 16,
    fontSize: 26,
    // lineHeight: 20,
    // textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
  stationList: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
  },
  stationListText: {
    fontSize: 18,
  },
});
