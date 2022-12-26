import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ThreadLikeButton = ({ pressedLike, setPressedLike, item }) => {
  const [likes, setLikes] = useState(item.likes);
  return (
    <View style={styles.iconAndText}>
      <TouchableOpacity
        onPress={() => {
          setPressedLike((v) => !v);
          setLikes((v) => (!pressedLike ? v + 1 : v - 1));
          // Do some update to Firebase of this Thread
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
