import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import ThreadBubble from "../../../components/ThreadBubble";

const TopThread = ({ item }) => {
  return (
    <View style={styles.container}>
      <ThreadBubble item={item} disableCommentButton={true}/>
    </View>
  );
};

export default TopThread;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    // padding: 15,
    // minHeight: 150,
    // justifyContent: "space-between",
    // marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.075)",
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
  },
  creatorName: {
    fontWeight: "500",
    marginBottom: 10,
    marginRight: 5,
  },
});
