import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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

const ThreadBubble = ({ item, disableCommentButton }) => {
  // useEffect(() => {
  //   const db = getFirestore(firebaseApp);

  //   const q = query(
  //     collection(db, "threads/" + threadData.threadID + "/comments"),
  //     where("threadID", "==", threadData.threadID)
  //   );
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const comments = [];
  //     querySnapshot.forEach((doc) => {
  //       comments.push(doc.data());
  //     });
  //     setCommentData(comments);
  //   });
  //   return unsubscribe;
  // }, []);

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
            {item.lineNumber && item.lineNumber != "" && (
              <View
                style={{
                  ...styles.destinationNameContainer,
                  backgroundColor: item.lineColor,
                }}
              >
                <Text style={styles.destinationName}>{item.lineNumber}</Text>
              </View>
            )}
            {item.tag && item.tag != "" && (
              <View
                style={{
                  ...styles.destinationNameContainer,
                  backgroundColor: "grey",
                }}
              >
                <Text style={styles.destinationName}>{item.tag}</Text>
              </View>
            )}
          </View>
          <Text style={styles.timestamp}>
            {moment(item.timeStamp).fromNow()}
          </Text>
        </View>
        <Text style={styles.creatorName}>{item.creatorName}</Text>

        {/* only for debugging */}
        <Text style={{ color: "#989898" }}>{item.creatorDeviceID}</Text>

        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
      </View>
      <View style={styles.bottomLine}>
        <View>
          <View style={styles.bottomLineIcon}>
            {/* <ThreadLikeButton
              pressedLike={pressedLike}
              setPressedLike={setPressedLike}
              item={item}
            /> */}
            {disableCommentButton ? null : (
              <View style={styles.iconAndText}>
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
                <Text style={styles.textAfterIcon}>
                  {item.numberOfComments}
                </Text>
              </View>
            )}
          </View>
        </View>
        <ThreadCountdown
          latestTimeAlive={item.latestTimeAlive}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
          item={item}
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
