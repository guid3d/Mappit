import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { firebaseConfig } from "../firebase/config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import tags_time from "../data/tags_time.json";
import tags from "../data/tags.json";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Format time to either MM:SS if the time is below 1 hour, or HH:MM::SS otherwise
const fmtMSS = (s) => {

  if (s > 3600) {
    var newFormat = (s - (s %= 3600)) / 3600 + ":" + (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s
  } else {
    var newFormat = (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  return newFormat;
};

const ThreadCountdown = ({ latestTimeAlive, isExpired, setIsExpired, item}) => {
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

  // Set standard maximum time of a thead to 1800 Seconds, however adjust if there is a tag on the thread.
  var max_time = 1800

  if (tags.includes(item.tag)) {
    max_time = tags_time[item.tag]
  }

  var diffTimeSeconds = max_time - moment().diff(latestTimeAlive, "seconds"); // 30min - valid
  // const minutes = Math.floor(diffTimeSeconds / 60);
  // const seconds = diffTimeSeconds % 60;

  if (diffTimeSeconds > 0) {
    return (
      <TouchableOpacity
        disabled={diffTimeSeconds > 900 ? true : false}
        onPress={() => {
          setPressed(true);

          // Creates a reference to the current thread before updating the "latestTimeAlive" field in the database
          const threadRef = doc(db, "threads", item["threadID"]);

          updateDoc(threadRef, {
            latestTimeAlive: moment().format()
          });

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
