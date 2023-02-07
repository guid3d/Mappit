import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { firebaseApp } from "../api/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  getCountFromServer,
} from "firebase/firestore";

const ThreadCommentButton = ({ item }) => {
  const [commentData, setCommentData] = useState([]);

  const db = getFirestore(firebaseApp);
  useEffect(() => {
    // console.log(item.threadID);
    // const getCommentNumber = async () => {
    //   const snapshot = await getCountFromServer(
    //     collection(db, "threads/" + item.threadID + "/comments")
    //   );
    //   console.log(`comment ${item.threadID} count: `, snapshot.data().count);
    //   setNumberOfComment(snapshot.data().count);
    // };
    // getCommentNumber();

    const q = collection(db, "threads", item.threadID, "comments");
    // where("threadID", "==", threadData.threadID)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ commentID: doc.id, ...doc.data() });
      });
      setCommentData(comments);
      console.log(comments);
    });
    return () => {
      unsubscribe();
      // setCommentData([]);
    };
  }, []);

  return (
    <View style={styles.iconAndText}>
      <Ionicons
        name="chatbubble-outline"
        size={20}
        color="black"
        style={styles.icon}
      />
      <Text style={styles.textAfterIcon}>{commentData.length}</Text>
    </View>
  );
};

export default ThreadCommentButton;

const styles = StyleSheet.create({
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  tagLine: {
    flexDirection: "row",
  },
  bottomLineIcon: {
    flexDirection: "row",
  },
  timestamp: {
    margin: 5,
    color: "#696969",
  },
  destinationName: {
    color: "white",
    fontWeight: "500",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  bottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 5,
    color: "#494949",
  },
  textAfterIcon: {
    marginRight: 10,
    color: "#494949",
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  creatorName: {
    fontWeight: "500",
    marginBottom: 10,
    marginRight: 5,
  },
});
