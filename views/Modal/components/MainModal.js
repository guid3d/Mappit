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
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "../../../api/firebaseConfig";
import ThreadBubble from "../../../components/ThreadBubble";
import { useNavigation } from "@react-navigation/native";
import MVVProduct from "./MVVProduct";

const MainModal = ({
  currentLocation,
  setSelectedLocation,
  selectedLocation,
  snapPoints,
  markerRef,
}) => {
  useEffect(() => {
    // handlePresentMainPress();
    bottomSheetModalMainRef.current.present();
    // console.log(currentLocation);
    const q = query(
      collection(db, "threads"),
      orderBy("likes", "desc"),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const threadDataTemp = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        threadDataTemp.push({ threadID: doc.id, ...doc.data() });
      });
      // console.log("threadDataTemp: ", threadDataTemp)
      setThreadData(threadDataTemp);
    });
    // queryForDocuments();

    // const unsubscribe = navigation.addListener("focus", () => {
    //   queryForDocuments();
    // });
    return unsubscribe;
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
    });
  const navigation = useNavigation();
  const db = getFirestore(firebaseApp);
  const [threadData, setThreadData] = useState([]);

  // const queryForDocuments = async (name) => {
  //   // setisFetching(true);
  //   const threadsQuery = query(
  //     collection(db, "threads"),
  //     orderBy("likes", "desc"),
  //     limit(3)
  //   );
  //   const querySnapshot = await getDocs(threadsQuery);
  //   const allDocs = [];
  //   querySnapshot.forEach((snap) => {
  //     allDocs.push({ threadID: snap.id, ...snap.data() });
  //   });
  //   setThreadData(allDocs);
  //   // setisFetching(false);
  //   // console.log(allDocs);
  // };

  // refs
  const bottomSheetModalMainRef = useRef(null);

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

  return (
    <BottomSheetModal
      name="Main"
      ref={bottomSheetModalMainRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      // handleComponent={renderHeaderHandle("Nearby Stations")}
      // children={renderBottomSheetContent}
    >
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text
              style={{
                ...styles.title,
                paddingBottom: 12,
              }}
            >
              Hottest now in Munich 🔥
            </Text>
            {threadData?.map((item, index) => (
              <TouchableOpacity
                key={item + index}
                onPress={() => {
                  navigation.navigate("ReadThread", { threadData: item });
                  console.log(item);
                }}
              >
                <View style={styles.threadBubble}>
                  <ThreadBubble item={item} from={"MainModal"} />
                </View>
              </TouchableOpacity>
            ))}
            <Text
              style={{
                ...styles.title,
                paddingBottom: 12,
              }}
            >
              Nearby Stations
            </Text>
            {data?.locations.map((station, index) => (
              <TouchableOpacity
                key={index}
                style={styles.stationList}
                onPress={() => {
                  setSelectedLocation(station);
                  // markerRef.current.showCallout();
                  console.log(station.products);
                }}
              >
                <Text style={styles.stationListText}>{station.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  {station.products.map((product, index) => (
                    <MVVProduct product={product} key={index} />
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default MainModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  indicator: {
    height: 4,
    opacity: 0.5,
  },
  stationList: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stationListText: {
    fontSize: 18,
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
