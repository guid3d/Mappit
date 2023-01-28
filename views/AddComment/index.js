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
} from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import moment from "moment";

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
    }
  }, [route.params?.threadData]);

  const entityRef = collection(db, "threads/" + threadData?.threadID + "/comments");

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0 && threadData?.threadID) {
      async function addNewDocument() {
        const data = {
            commentID: "",
            text: entityText,
            creatorName: creator,
            timeStamp:  moment().format(),
            likes: 0,
            threadID: threadData?.threadID,
            latestTimeAlive: moment().format(),
        };
        const docRef = await addDoc(entityRef, data);
        data.commentID = docRef.id;
        setDoc(docRef, data)
        .then(docRef => {
            console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
        console.log("Document written with ID: ", docRef.id);
        console.log("Data when adding comment: ", data);
        setEntityText("");
        Keyboard.dismiss();
        navigation.goBack();
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