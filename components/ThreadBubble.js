import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import ThreadLikeButton from "./ThreadLikeButton";
import ThreadCountdown from "./ThreadCountdown";

const ThreadBubble = ({ item, disableCommentButton }) => {
  const [pressedLike, setPressedLike] = useState(false);
  // const [pressedTimer, setPressedTimer] = useState(false);
  const [timeToLast, setTimeToLast] = useState("2023-01-14T14:43:17+01:00");
  const [isExpired, setIsExpired] = useState(false);
  return (
    <View
      style={
        !isExpired ? styles.container : { ...styles.container, opacity: 0.5 }
      }
    >
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
        <View>
          <View style={styles.bottomLineIcon}>
            <ThreadLikeButton
              pressedLike={pressedLike}
              setPressedLike={setPressedLike}
              item={item}
            />
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
          timeToLast={timeToLast}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
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
