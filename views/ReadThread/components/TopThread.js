import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const TopThread = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topLine}>
          <View
            style={{
              ...styles.destinationNameContainer,
              backgroundColor: item.lineColor,
            }}
          >
            <Text style={styles.destinationName}>
              {item.lineNumber} {item.lineName}
            </Text>
          </View>
          <Text style={styles.timestamp}>
            {moment(item.timeStamp).fromNow()}
          </Text>
        </View>
        <Text style={styles.creatorName}>{item.creatorName}</Text>
        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
      </View>
      <View style={styles.bottomLine}>
        <View style={styles.bottomLineIcon}>
          <View style={styles.iconAndText}>
            <Ionicons
              name="heart-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.textAfterIcon}>{item.likes}</Text>
          </View>
          <View style={styles.iconAndText}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.textAfterIcon}>{item.numberOfComments}</Text>
          </View>
          <View style={styles.iconAndText}>
            <Ionicons
              name="timer-outline"
              size={21}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.textAfterIcon}>09:55 left</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopThread;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 15,
    minHeight: 150,
    justifyContent: "space-between",
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