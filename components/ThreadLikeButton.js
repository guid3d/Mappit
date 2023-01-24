import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { firebaseConfig } from "../firebase/config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const ThreadLikeButton = ({ pressedLike, setPressedLike, item }) => {
  const [likes, setLikes] = useState(item.likes);
  return (
    <View style={styles.iconAndText}>
      <TouchableOpacity
        onPress={() => {

          // Creates a reference to the current thread 
          const threadRef = doc(db, "threads", item["_firestore_id"]);

          setPressedLike((v) => !v);
          setLikes((v) => (!pressedLike ? v + 1 : v - 1));

          // Now either increments or decrements the "Likes" of the specific thread
          if(pressedLike) {
            updateDoc(threadRef, {
              likes: decrement
            });
          } else {
            updateDoc(threadRef, {
              likes: increment
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
      <Text style={styles.textAfterIcon}>{likes}</Text>
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
