import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import { firebaseApp } from "../api/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const ThreadLikeButton = ({
  pressedLike,
  setPressedLike,
  item,
  type,
  from,
}) => {
  const db = getFirestore(firebaseApp);

  const [deviceId, setDeviceID] = useState("");
  const [likes, setLikes] = useState(item.likes);
  let q;

  useEffect(() => {
    SecureStore.getItemAsync("secure_deviceid").then((fetchUUID) => {
      if (fetchUUID) {
        const parsedUUID = JSON.parse(fetchUUID);
        setDeviceID(parsedUUID);
        if (type === "comment") {
          // console.log("Comment: ", item.commentID);
          q = doc(db, "threads", item.threadID, "comments", item.commentID);
        }
        if (type === "thread") {
          q = doc(db, "threads", item.threadID);
        }
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const getLikes = querySnapshot.data().likes;
          setLikes(getLikes);
        });
        return () => {
          unsubscribe();
        };
      }
    });
  }, []);

  useEffect(() => {
    const alreadyLike = likes.find(
      (likedByDeviceId) => likedByDeviceId === deviceId
    );
    console.log("Current device ID: ", deviceId);
    console.log("AlreadyLike: ", alreadyLike);
    if (alreadyLike) {
      setPressedLike(true);
    }
  }, [likes]);

  return (
    <View style={styles.iconAndText}>
      <TouchableOpacity
        disabled={from === "MainModal" ? true : false}
        onPress={() => {
          setPressedLike((v) => !v);
          // Now either increments or decrements the "Likes" of the specific thread
          let q;
          if (type === "comment") {
            // console.log("Comment: ", item.commentID);
            q = doc(db, "threads", item.threadID, "comments", item.commentID);
          }
          if (type === "thread") {
            q = doc(db, "threads", item.threadID);
          }
          if (pressedLike) {
            // remove deviceID from likes[]
            const newLikes = likes.filter(
              (likedByDeviceId) => likedByDeviceId != deviceId
            );
            console.log(newLikes);
            setLikes(newLikes);
            updateDoc(q, {
              likes: newLikes,
            });
          } else {
            // add deviceID from likes[]
            const newLikes = [...likes, deviceId];
            console.log(newLikes);
            setLikes(newLikes);
            updateDoc(q, {
              likes: newLikes,
            });
          }
        }}
      >
        {from === "MainModal" ? (
          <Ionicons name="heart-outline" size={24} style={styles.iconDisabled} />
        ) : pressedLike ? (
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
  iconDisabled: {
    marginRight: 5,
    color: "#db8c94",
  },
});
