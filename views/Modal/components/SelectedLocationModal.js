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
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import ThreadBubble from "../../../components/ThreadBubble";
import MVVProduct from "./MVVProduct";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "../../../api/firebaseConfig";

const SelectedLocationModal = ({ selectedLocation, setSelectedLocation }) => {
  const navigation = useNavigation();

  const db = getFirestore(firebaseApp);
  const [threadData, setThreadData] = useState([]);
  const [isFetching, setisFetching] = useState(false);

  // const queryForDocuments = async (name) => {
  //   setisFetching(true);
  //   // const threadsQuery = query(
  //   //   collection(db, "threads"),
  //   //   where("stationName", "==", name)
  //   // );

  //   const unsubscribe = onSnapshot(
  //     collection(db, "threads"),
  //     where("stationName", "==", name),
  //     (querySnapshot) => {
  //       const allDocs = [];
  //       querySnapshot.forEach((snap) => {
  //         allDocs.push(snap.data());
  //         s;
  //       });
  //       console.log("Snap: ", allDocs.join(", "));
  //       setThreadData(allDocs);
  //       setisFetching(false);
  //     }
  //   );

  //   return unsubscribe;
  // };

  useEffect(() => {
    console.log(threadData)
    if (selectedLocation) {
      handlePresentLocationPress();
      // queryForDocuments(selectedLocation.name);

      const q = query(
        collection(db, "threads"),
        where("stationName", "==", selectedLocation.name)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const threadDataTemp = [];
        querySnapshot.forEach((doc) => {
          threadDataTemp.push(doc.data());
        });
        setThreadData(threadDataTemp);
      });
      return () => {
        unsubscribe();
        setThreadData([])
      };
    }
  }, [selectedLocation]);

  const bottomSheetModalLocationRef = useRef(null);
  const { dismiss } = useBottomSheetModal();

  const snapPoints = useMemo(() => ["50%", "85%"], []);

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
          <View style={{ paddingVertical: 5, flexDirection: "row" }}>
            {location?.products.map((product, index) => (
              <View key={index} style={{ paddingRight: 3 }}>
                <MVVProduct product={product} />
              </View>
            ))}
          </View>
        </BottomSheetHandle>
      ),
    []
  );

  const renderFlatListItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ReadThread", { threadData: item });
        console.log(item);
      }}
    >
      <View style={styles.threadBubble}>
        <ThreadBubble item={item} />
      </View>
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
          navigation.navigate("AddThread", {
            selectedLocation: selectedLocation,
          });
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
        // refreshing={isFetching}
        // onRefresh={() => {
        //   if (selectedLocation) {
        //     queryForDocuments(selectedLocation.name);
        //   }
        // }}
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
  threadBubble: {
    borderRadius: 15,
    backgroundColor: "#F4F4F4",
    // padding: 15,
    // minHeight: 150,
    // justifyContent: "space-between",
    marginVertical: 5,
  },
});
