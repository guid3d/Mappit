import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TopThread from "./components/TopThread";
import SubThread from "./components/SubThread";
import { FAB } from "@rneui/themed";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from "../../api/firebaseConfig";

const ReadThread = ({ navigation, route }) => {
  const [threadData, setThreadData] = useState();
  const [isFetching, setisFetching] = useState(false);
  const [CommentData, setCommentData] = useState([]);
  const db = getFirestore(firebaseApp);
  useEffect(() => {
    if (route.params?.threadData) {
      setThreadData(route.params.threadData);
    }
  }, [route.params?.threadData]);

  useEffect(() => {
    navigation.setOptions({
      title: threadData?.stationName,
    });
  });

  useEffect(() => {
    if (threadData) {
      queryForDocuments(threadData?.threadID);
    }
    const unsubscribe = navigation.addListener("focus", () => {
      if (threadData) queryForDocuments(threadData?.threadID);
    });
    return unsubscribe;
  }, [navigation, threadData]);

  const queryForDocuments = async (threadID) => {
    setisFetching(true);
    const threadsQuery = query(
      collection(db, "threads/" + threadID + "/comments"),
      where("threadID", "==", threadID)
    );
    const querySnapshot = await getDocs(threadsQuery);
    const allDocs = [];
    querySnapshot.forEach((snap) => {
      allDocs.push(snap.data());
    });
    setCommentData(allDocs);
    setisFetching(false);
  };

  const renderFlatListItem = useCallback(({ item, index }) => (
    <SubThread item={item} />
  ));

  const renderFlatListHeader = useCallback(() => (
    <TopThread item={threadData} />
  ));

  if (threadData) {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={CommentData}
          renderItem={renderFlatListItem}
          contentContainerStyle={styles.container}
          ListHeaderComponent={renderFlatListHeader}
          // refreshing={isFetching}
          // onRefresh={() => {
          //   if (threadData) {
          //     queryForDocuments(threadData?.threadID);
          //   }
          // }}
        />
        <FAB
          // visible={visible}
          icon={{ name: "comment", color: "white" }}
          color="#24a0ed"
          style={styles.fab}
          onPress={() => {
            navigation.navigate("AddComment", { threadData: threadData });
          }}
        />
      </View>
    );
  }
};

export default ReadThread;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
