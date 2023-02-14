import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import ThreadLikeButton from "./ThreadLikeButton";
import ThreadCountdown from "./ThreadCountdown";
import { firebaseApp } from "../api/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import ThreadCommentButton from "./ThreadCommentButton";

const ThreadBubble = ({ item, disableCommentButton, from }) => {
  const db = getFirestore(firebaseApp);
  useEffect(() => {
    console.log(item.threadID);
    const q = doc(db, "threads", item.threadID);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setThreadData({ threadID: querySnapshot.id, ...querySnapshot.data() });
    });
    return () => {
      unsubscribe();
      setThreadData(item);
    };
  }, []);

  const [threadData, setThreadData] = useState(item);
  const [pressedLike, setPressedLike] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  return (
    <View
      style={
        !isExpired ? styles.container : { ...styles.container, opacity: 0.5 }
      }
    >
      <View>
        <View style={styles.topLine}>
          <View style={styles.tagLine}>
            {threadData.lineNumber && threadData.lineNumber != "" && (
              <View
                style={{
                  ...styles.destinationNameContainer,
                  backgroundColor: threadData.lineColor,
                }}
              >
                <Text style={styles.destinationName}>
                  {threadData.lineNumber}
                </Text>
              </View>
            )}
            {threadData.tag && threadData.tag != "" && (
              <View
                style={{
                  ...styles.destinationNameContainer,
                  backgroundColor: "grey",
                }}
              >
                <Text style={styles.destinationName}>{threadData.tag}</Text>
              </View>
            )}
          </View>
          <Text style={styles.timestamp}>
            {moment(threadData.timeStamp).fromNow()}
          </Text>
        </View>
        <Text style={styles.creatorName}>{threadData.creatorName}</Text>

        {/* only for debugging */}
        <Text style={{ color: "#989898" }}>{threadData.threadID}</Text>

        <Text style={{ marginBottom: 10 }}>{threadData.content}</Text>
      </View>
      <View style={styles.bottomLine}>
        <View>
          <View style={styles.bottomLineIcon}>
            <ThreadLikeButton
              pressedLike={pressedLike}
              setPressedLike={setPressedLike}
              item={threadData}
              type="thread"
              from={from}
            />
            {disableCommentButton ? null : (
              <ThreadCommentButton item={threadData} from={from} />
            )}
          </View>
        </View>
        <ThreadCountdown
          latestTimeAlive={threadData.latestTimeAlive}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
          item={threadData}
        />
      </View>
    </View>
  );
};

export default ThreadBubble;

const styles = StyleSheet.create({
  container: {
    // borderRadius: 15,
    // backgroundColor: "#F4F4F4",
    padding: 15,
    minHeight: 150,
    justifyContent: "space-between",
    // marginVertical: 5,
  },
  destinationNameContainer: {
    borderRadius: 20,
    // backgroundColor: "orange",
  },
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
