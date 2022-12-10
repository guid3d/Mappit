import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ThreadBubble from "../Modal/components/ThreadBubble";

const ReadThread = ({ route }) => {
  const [threadData, setThreadData] = useState();
  useEffect(() => {
    if (route.params?.threadData) {
      setThreadData(route.params.threadData);
    }
  }, [route.params?.threadData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {threadData ? <ThreadBubble item={threadData} /> : null}
    </ScrollView>
  );
};

export default ReadThread;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
