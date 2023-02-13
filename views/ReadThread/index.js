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
  onSnapshot,
  doc,
} from "firebase/firestore";
import { firebaseApp } from "../../api/firebaseConfig";

const ReadThread = ({ navigation, route }) => {
  const [threadData, setThreadData] = useState();
  const [isFetching, setisFetching] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    if (route.params?.threadData) {
      // console.log("if (route.params?.threadData)");
      const threadData = route.params.threadData;
      setThreadData(threadData);

      // setThreadData(route.params.threadData);
      // console.log(route.params.threadData)
      navigation.setOptions({
        title: threadData.stationName,
      });

      const q = collection(db, "threads", threadData.threadID, "comments");
      // where("threadID", "==", threadData.threadID)

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
          // console.log("CommentID", { ...doc.data(), commentID: doc.id,  })
          comments.push({
            ...doc.data(),
            commentID: doc.id,
            threadID: threadData.threadID,
          });
        });
        setCommentData(comments);
        // console.log(comments);
      });
      return () => {
        unsubscribe();
        // setCommentData([]);
      };
    }
  }, [route.params?.threadData]);

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
          data={commentData}
          renderItem={renderFlatListItem}
          contentContainerStyle={styles.container}
          ListHeaderComponent={renderFlatListHeader}
          refreshing={isFetching}
          keyExtractor={(item, index) => item.commentID}
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
