import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../../firebase/config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import ubahnLines from "../../data/ubahn_lines.json";
import sbahnLines from "../../data/sbahn_lines.json";
import tags from "../../data/tags.json";
import lineColors from "../../data/line_colors.json";

const ubahnLinesMap = new Map(Object.entries(ubahnLines));
const sbahnLinesMap = new Map(Object.entries(sbahnLines));
const linesMap = new Map(ubahnLinesMap);
for (const [key, value] of sbahnLinesMap.entries()) {
  if (linesMap.has(key)) {
    linesMap.set(key, linesMap.get(key).concat(value));
  } else {
    linesMap.set(key, value);
  }
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddThread = ({ route }) => {
  const navigation = useNavigation();
  const entityRef = collection(db, "threads");
  const [entityText, setEntityText] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);
  const lineColorMap = new Map(Object.entries(lineColors));

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  useEffect(() => {
    // if (selectedLine) {
      console.log("selectedTag", selectedTag);
    // }
  }, [selectedTag]);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0 && selectedLocation?.id) {
      async function addNewDocument() {
        await SecureStore.getItemAsync("secure_deviceid")
          .then((fetchUUID) => {
            if (fetchUUID) {
              const data = {
                // childThreadID: "",
                // commentIDArray: [],
                content: entityText,
                creatorName: creator,
                creatorDeviceID: JSON.parse(fetchUUID),
                likes: [],
                lineColor: lineColorMap.get(selectedLine) || "white",
                stationName: selectedLocation?.name,
                tag: selectedTag,
                lineNumber: selectedLine,
                // motherThreadID: "",
                // threadID: "",
                numberOfComments: 0,
                locationID: selectedLocation?.id,
                timeStamp: moment().format(),
                latestTimeAlive: moment().format(),
              };
              addDoc(entityRef, data)
                .then((result) => {
                  // console.log(result.id);
                  // data.threadID = result.id;
                  // setDoc(result, data)
                  //   .then(() => {
                  //     console.log(
                  //       "Entire Document has been updated successfully"
                  //     );
                  //     console.log("Document written with ID: ", result.id);
                  //     console.log("Data when adding thread: ", data);
                      setEntityText("");
                      Keyboard.dismiss();
                      navigation.goBack();
                    // })
                    // .catch((error) => {
                    //   console.log(error);
                    // });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      addNewDocument();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={onAddButtonPress} />,
      title: "New Thread",
      headerLeft: () => (
        <Button
          title="Close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });

    // StatusBar.setStatusBarStyle("dark-content");
    return () => {
      // StatusBar.setStatusBarStyle("auto");
    };
  }, [entityText, creator, selectedTag]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagButton}
            onPress={() => {
              setSelectedTag(tag);
              // console.log(tag)
            }}
          >
            <Text
              style={[
                styles.tagText,
                selectedTag == tag && styles.selectedTagText,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedLocation?.name && linesMap.get(selectedLocation?.name) && (
        <View style={styles.tagContainer}>
          {linesMap.get(selectedLocation?.name).map((line, index) => (
            <TouchableOpacity
              key={index}
              style={[
                {
                  ...styles.tagButton,
                  backgroundColor: lineColorMap.get(line),
                },
                selectedLine == line && styles.selectedTagButton,
              ]}
              onPress={() => {
                console.log(line);
                setSelectedLine(line);
              }}
            >
              <Text
                style={[
                  styles.lineText,
                  selectedLine == line && styles.selectedTagText,
                ]}
              >
                {line}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        style={styles.yourNameInput}
        placeholder="Your Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setCreator(text)}
        value={creator}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        numberOfLines={1}
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="What is happening now?"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEntityText(text)}
        value={entityText}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        numberOfLines={10}
        multiline={true}
      />
    </ScrollView>
  );
};

export default AddThread;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 18,
    paddingTop: 15,
    flex: 1,
    marginRight: 0,
    fontSize: 20,
  },
  yourNameInput: {
    width: "100%",
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 18,
    paddingTop: 15,
    marginRight: 0,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#24a0ed",
    padding: 5,
    borderRadius: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  selectedTagButton: {
    backgroundColor: "white",
    margin: 5,
    borderWidth: 2,
    borderColor: "green",
  },
  tagButton: {
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  tagText: {
    color: "#555555",
  },
  selectedTagText: {
    fontWeight: "bold",
    color: "black",
  },
  lineText: {
    color: "white",
    fontWeight: "500",
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
