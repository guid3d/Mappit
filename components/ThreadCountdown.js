import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const fmtMSS = (s) => {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
};

const ThreadCountdown = ({ latestTimeAlive, isExpired, setIsExpired }) => {
  const [time, setTime] = useState(Date.now());
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (diffTimeSeconds <= 0) {
      setIsExpired(true);
    }
  }, [diffTimeSeconds]);

  const diffTimeSeconds = 1800 - moment().diff(latestTimeAlive, "seconds"); // 30min - valid
  // const minutes = Math.floor(diffTimeSeconds / 60);
  // const seconds = diffTimeSeconds % 60;

  if (diffTimeSeconds > 0) {
    return (
      <TouchableOpacity
        disabled={diffTimeSeconds > 900 ? true : false}
        onPress={() => {
          setPressed(true);
        }}
      >
        <View
          style={
            diffTimeSeconds <= 900
              ? { ...styles.iconAndText, backgroundColor: "#36d964" }
              : styles.iconAndText
          }
        >
          {diffTimeSeconds > 900 ? (
            <MaterialCommunityIcons
              name="clock-outline"
              size={21}
              style={styles.icon}
            />
          ) : (
            <MaterialCommunityIcons
              name="clock-plus-outline"
              size={21}
              style={styles.icon}
            />
          )}

          <Text style={styles.textAfterIcon}>{`${fmtMSS(
            diffTimeSeconds
          )}`}</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.iconAndText}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={21}
          style={styles.icon}
        />

        <Text style={styles.textAfterIcon}>Expired</Text>
      </View>
    );
  }
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
    width: 90,
    padding: 5,
    backgroundColor: "#a1a1a1",
    borderRadius: 20,
  },
});
