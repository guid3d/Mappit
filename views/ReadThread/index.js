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

const ReadThread = ({ route }) => {
  const [threadData, setThreadData] = useState();
  useEffect(() => {
    if (route.params?.threadData) {
      setThreadData(route.params.threadData);
    }
  }, [route.params?.threadData]);

  const renderFlatListItem = useCallback(({ item, index }) => (
    <SubThread item={item} />
  ));

  const renderFlatListHeader = useCallback(() => (
    <TopThread item={threadData} />
  ));

  if (threadData) {
    return (
      <FlatList
        data={commentDummy.comments}
        renderItem={renderFlatListItem}
        contentContainerStyle={styles.container}
        ListHeaderComponent={renderFlatListHeader}
      />
    );
  }
};

export default ReadThread;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
