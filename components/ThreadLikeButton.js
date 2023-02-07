import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

import { firebaseApp } from "../api/firebaseConfig";

// const increment = firebase.firestore.FieldValue.increment(1);
// const decrement = firebase.firestore.FieldValue.increment(-1);

const ThreadLikeButton = ({ pressedLike, setPressedLike, item }) => {
  const db = getFirestore(firebaseApp);

  const [deviceId, setDeviceID] = useState("");
  const [likes, setLikes] = useState(item.likes);
  const threadRef = item.hasOwnProperty("commentID")
    ? doc(db, "threads/" + item["threadID"] + "/comments", item["commentID"])
    : doc(db, "threads", item["threadID"]);

  useEffect(() => {
    SecureStore.getItemAsync("secure_deviceid").then((fetchUUID) => {
      if (fetchUUID) {
        const parsedUUID = JSON.parse(fetchUUID);
        setDeviceID(parsedUUID);
        const alreadyLike = likes.find(
          (likedByDeviceId) => (likedByDeviceId = parsedUUID)
        );
        if (alreadyLike) {
          setPressedLike(true);
        }
      }
    });
  }, []);

  return (
    <View style={styles.iconAndText}>
      <TouchableOpacity
        onPress={() => {
          // Creates a reference to the current thread
          // const threadRef = doc(db, "threads", item["threadID"]);

          setPressedLike((v) => !v);
          // setLikes((v) => (!pressedLike ? v + 1 : v - 1));

          // Now either increments or decrements the "Likes" of the specific thread
          if (pressedLike) {
            // remove deviceID from likes[]
            const newLikes = likes.filter(
              (likedByDeviceId) => likedByDeviceId != deviceId
            );
            console.log(newLikes);
            setLikes(newLikes);
            updateDoc(threadRef, {
              likes: newLikes,
            });
          } else {
            // add deviceID from likes[]
            const newLikes = [...likes, deviceId];
            console.log(newLikes);
            setLikes(newLikes);
            updateDoc(threadRef, {
              likes: newLikes,
            });
          }
        }}
      >
        {pressedLike ? (
          <Ionicons name="heart" size={24} style={styles.iconPressed} />
        ) : (
          <Ionicons name="heart-outline" size={24} style={styles.icon} />
        )}
      </TouchableOpacity>
      <Text style={styles.textAfterIcon}>{likes.length}</Text>
    </View>
  );
};

export default ThreadLikeButton;

const styles = StyleSheet.create({
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  textAfterIcon: {
    marginRight: 10,
    color: "#494949",
  },
  icon: {
    marginRight: 5,
    color: "#494949",
  },
  iconPressed: {
    marginRight: 5,
    color: "#F67280",
  },
});
