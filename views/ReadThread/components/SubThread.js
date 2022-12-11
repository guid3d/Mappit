import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const SubThread = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topLine}>
          <View
            style={{
              // ...styles.creatorNameContainer,
              // backgroundColor: item.lineColor,
            }}
          >
            <Text style={styles.creatorName}>
              {item.creatorName}
            </Text>
          </View>
          <Text style={styles.timestamp}>{moment(item.timeStamp).fromNow()}</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>{item.text}</Text>
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
        </View>
      </View>
    </View>
  );
};

export default SubThread;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderBottomColor: "rgba(0,0,0,0.075)",
    borderLeftColor: "rgba(0,0,0,0.3)",
    // marginLeft: 5,
  },
  creatorNameContainer: {
    borderRadius: 20,
    // backgroundColor: "orange",
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bottomLineIcon: {
    flexDirection: "row",
  },
  timestamp: {
    margin: 5,
    color: "#696969"
  },
  creatorName: {
    fontWeight: "500",
    marginVertical: 5,
    marginRight: 5
  },
  bottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 5,
    color: "#494949"

  },
  textAfterIcon: {
    marginRight: 10,
    color: "#494949"

  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
});
