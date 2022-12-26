import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const fmtMSS = (s) => {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
};

const ThreadCountdown = ({ timeToLast }) => {
  const [time, setTime] = useState(Date.now());
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const diffTimeSeconds = 600 - moment().diff(timeToLast, "seconds"); // 10min - valid
  // const minutes = Math.floor(diffTimeSeconds / 60);
  // const seconds = diffTimeSeconds % 60;
  // if (diffTimeSeconds > 0) {
  return (
    <TouchableOpacity
      disabled={diffTimeSeconds > 300 ? true : false}
      onPress={() => {
        setPressed(true);
      }}
    >
      <View
        style={
          pressed
            ? { ...styles.iconAndText, backgroundColor: "green" }
            : styles.iconAndText
        }
      >
        <MaterialCommunityIcons
          name="clock-plus-outline"
          size={21}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.textAfterIcon}>{`${fmtMSS(diffTimeSeconds)}`}</Text>
      </View>
    </TouchableOpacity>
  );
  // }
};

export default ThreadCountdown;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
    color: "#fff",
  },
  textAfterIcon: {
    color: "#fff",
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    width: 80,
    padding: 5,
    backgroundColor: "#8a8a8a",
    borderRadius: 20,
  },
});
