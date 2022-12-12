import {
  ActivityIndicator,
  Button,
  RefreshControl,
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
import { firebaseConfig } from "../../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from "../../../api/firebaseConfig";

const SelectedLocationModal = ({ selectedLocation, setSelectedLocation }) => {
  const navigation = useNavigation();

  const db = getFirestore(firebaseApp);
  const [threadData, setthreadData] = useState([]);
  const [isFetching, setisFetching] = useState(false);

  const queryForDocuments = async (lineName) => {
    setisFetching(true);
    const threadsQuery = query(
      collection(db, "threads"),
      where("lineName", "==", lineName)
      // limit(10)
    );
    const querySnapshot = await getDocs(threadsQuery);
    const allDocs = [];
    querySnapshot.forEach((snap) => {
      allDocs.push(snap.data());
    });
    setthreadData(allDocs);
    console.log(threadData);
    setisFetching(false);
  };

  useEffect(() => {
    if (selectedLocation) {
      handlePresentLocationPress();
      queryForDocuments("Fürstenried West");
      // queryForDocuments(selectedLocation.name);
    }
    // console.log(selectedLocation);
  }, [selectedLocation]);

  const bottomSheetModalLocationRef = useRef(null);
  const { dismiss } = useBottomSheetModal();

  const snapPoints = useMemo(() => ["50%", "90%"], []);

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
              <View
                key={index}
                // style={{ width: 30, height: 30, backgroundColor: "grey" }}
              >
                {/* <MVVProduct product="BUS" /> */}
                <Text>{product}</Text>
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ReadThread", { threadData: item });
      }}
    >
      <ThreadBubble item={item} />
    </TouchableOpacity>
  ));

  const renderFlatListHeader = useCallback(() => (
    <View
      style={{
        marginTop: 10,
        marginBottom: 5,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontWeight: "500",
          fontSize: 18,
          color: "#010101",
          paddingVertical: 5,
        }}
      >
        Thread
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#24a0ed",
          padding: 5,
          borderRadius: 30,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          navigation.navigate("AddThread");
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 16, color: "#fff" }}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <BottomSheetModal
      name="Location"
      ref={bottomSheetModalLocationRef}
      snapPoints={snapPoints}
      handleComponent={renderHeaderHandle(selectedLocation)}
      enablePanDownToClose={false}
    >
      <BottomSheetFlatList
        data={threadData}
        renderItem={renderFlatListItem}
        contentContainerStyle={styles.container}
        ListHeaderComponent={renderFlatListHeader}
        refreshing={isFetching}
        onRefresh={() => {
          queryForDocuments("Fürstenried West");
        }}
      />
    </BottomSheetModal>
  );
};

export default SelectedLocationModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    // zIndex: 99999,
  },
  headerContainer: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.075)",
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
