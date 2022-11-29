import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

// const mvgApi = require("@lynbarry/mvg-api");

const ThreadList = () => {
  return (
    <View>
      <Text>ThreadList</Text>
      {/* <Button
        onPress={() => {
          mvgApi.getDepartures("Harras", ["u", "s", "b", "t"]).then((lines) => {
            console.log(lines);
          });
        }}
        title="Press me"
      /> */}
    </View>
  );
};

export default ThreadList;

const styles = StyleSheet.create({});
