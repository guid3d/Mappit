import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TopThread from "./components/TopThread";
import SubThread from "./components/SubThread";
import { commentDummy } from "../../api/api";
import { FAB } from "@rneui/themed";

const ReadThread = ({ navigation, route }) => {
  const [threadData, setThreadData] = useState();
  useEffect(() => {
    if (route.params?.threadData) {
      setThreadData(route.params.threadData);
    }
  }, [route.params?.threadData]);

  useEffect(() => {
    navigation.setOptions({
      title: threadData?.stationName,
    });
  });

  const renderFlatListItem = useCallback(({ item, index }) => (
    <SubThread item={item} />
  ));

  const renderFlatListHeader = useCallback(() => (
    <TopThread item={threadData} />
  ));

  if (threadData) {
    return (
      <View>
      <FlatList
        data={commentDummy.comments}
        renderItem={renderFlatListItem}
        contentContainerStyle={styles.container}
        ListHeaderComponent={renderFlatListHeader}
      />
      <FAB
        // visible={visible}
        icon={{ name: "comment", color: "white" }}
        color="#24a0ed"
        style={styles.fab}
        onPress={() => {
          navigation.navigate("AddComment", {threadData: threadData,});
        }}
      />
      </View>
    );
  }
};

export default ReadThread;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
