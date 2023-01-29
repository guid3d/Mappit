import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBarPlaceholder = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Search");
      }}
    >
      <View style={{ ...styles.container, top: insets.top + 8 }}>
        <Ionicons name="search" size={20} color="#696969" />
        <Text style={styles.text}>Search in threads...</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBarPlaceholder;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#fff",
    left: 10,
    right: 10,
    zIndex: 10000,
    flexDirection: "row",
  },
  text: {
    fontSize: 17,
    color: "#696969",
    paddingLeft: 10,
  },
});
