import {
  FlatList,
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
import { StatusBar } from "expo-status-bar";
import { firebaseConfig } from "../../firebase/config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import moment from "moment";
import * as SecureStore from "expo-secure-store";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddComment = ({ route }) => {
  const navigation = useNavigation();
  const [entityText, setEntityText] = useState("");
  const [creator, setCreator] = useState("");
  const [threadData, setthreadData] = useState("");

  useEffect(() => {
    if (route.params?.threadData) {
      setthreadData(route.params.threadData);
      console.log(route.params.threadData);
    }
  }, [route.params?.threadData]);

  const entityRef = collection(
    db,
    "threads/" + threadData?.threadID + "/comments"
  );
  const threadRef = doc(db, "threads/" + threadData?.threadID);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0 && threadData?.threadID) {
      async function addNewDocument() {
        await SecureStore.getItemAsync("secure_deviceid").then((fetchUUID) => {
          if (fetchUUID) {
            const data = {
              text: entityText,
              creatorName: creator,
              creatorDeviceID: JSON.parse(fetchUUID),
              timeStamp: moment().format(),
              likes: [],
              // threadID: threadData?.threadID,
              latestTimeAlive: moment().format(),
            };
            addDoc(entityRef, data)
              .then((result) => {
                // data.commentID = result.id;
                // setDoc(result, data)
                //   .then(() => {
                //     console.log(
                //       "Entire Document has been updated successfully"
                //     );
                //     console.log(data);
                    setEntityText("");
                    Keyboard.dismiss();
                    navigation.goBack();
                    // const numberOfComments = threadData.hasOwnProperty(
                    //   "numberOfComments"
                    // )
                    //   ? threadData.numberOfComments + 1
                    //   : 1;
                    // updateDoc(threadRef, {
                    //   numberOfComments: numberOfComments,
                    // })
                    //   .then(() => {
                    //     console.log("Document written with ID: ", result.id);
                    //     console.log("Data when adding comment: ", data);
                    //     setEntityText("");
                    //     Keyboard.dismiss();
                    //     navigation.goBack();
                    //   })
                    //   .catch((error) => {
                    //     console.log(error);
                    //   });
                  // })
                  // .catch((error) => {
                  //   console.log(error);
                  // });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
      addNewDocument();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={onAddButtonPress} />,
      title: "New Comment",
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
  }, [entityText, creator]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

export default AddComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  // formContainer: {
  //   flexDirection: "column",
  //   height: "100%",
  //   width: "100%",
  //   marginTop: 0,
  //   marginBottom: 0,
  //   flex: 1,
  //   paddingTop: 0,
  //   paddingBottom: 0,
  //   paddingLeft: 0,
  //   paddingRight: 0,
  //   justifyContent: "right",
  //   // alignItems: "top",
  // },
  input: {
    width: "100%",
    // height: "100%",
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
    // height: "100%",
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 18,
    paddingTop: 15,
    // flex: 1,
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
  // button2: {
  //   backgroundColor: "white",
  //   padding: 5,
  //   borderRadius: 30,
  //   paddingHorizontal: 20,
  //   alignItems: "center",
  //   justifyContent: 'center'
  // },
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
});
