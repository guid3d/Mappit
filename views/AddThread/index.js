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
import { firebase } from "../../firebase/config";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; 
import { Timestamp } from "@firebase/firestore";
// const { InstantSearch, SearchBox, Hits, Highlight, Configure } = 'react-instantsearch-dom';
// import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
// const searchClient = instantMeiliSearch(
//   "http://localhost:7700"
// );

// const AddThread = () => {
//   const entityRef = firebase.firestore().collection("threads");
//   const [entityText, setEntityText] = useState("");
//   const [creator, setCreator] = useState("");
//   const onAddButtonPress = () => {
//     if (entityText && entityText.length > 0) {
//       const timestamp = firebase.firestore.FieldValue.serverTimestamp();

//       entityRef
//         .add(data)
//         .then((_doc) => {
//           setEntityText("");
//           setCreator("");
//           Keyboard.dismiss();
//           navigation.goBack();
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     }
//   };

// const firebaseConfig = {
//   apiKey: "AIzaSyD1g_VTP4V4MBDeT8OJcB28ogjKedMNcAg",
//   authDomain: "mappit-c8d5d.firebaseapp.com",
//   projectId: "mappit-c8d5d",
//   storageBucket: "mappit-c8d5d.appspot.com",
//   messagingSenderId: "233256493371",
//   appId: "1:233256493371:web:00a95f440a246cde9ed71e",
//   measurementId: "G-WBQPW3XYQT"
// };

// Initialize Firebase
const app = firebase;
//initializeApp(firebaseConfig);
const db = getFirestore();
// const auth = getAuth(app);

const AddThread = () => {
  const navigation = useNavigation();
  const entityRef = collection(db, 'threads')
  const [entityText, setEntityText] = useState("");
  const [creator, setCreator] = useState("");
  const onAddButtonPress = () => {
    console.log("Adding message: ", entityText);
    console.log("By: ", creator);
    if (entityText && entityText.length > 0) {
        async function addNewDocument() {
          const data = {
            childThreadID: "",
            commentIDArray: [],
            content: entityText,
            creatorName: creator,
            likes: 0,
            lineColor: "",
            lineName: "",
            lineNumber: "",
            motherThreadID: "",
            numberOfComments: 0,
            threadID: 0,
            locationID: "",
            timeStamp: Timestamp.fromDate(new Date()),
            timeToLast: 3000,
          };
          const docRef = await addDoc(entityRef, data);
          console.log("Document written with ID: ", docRef.id);
          setEntityText('');
          Keyboard.dismiss();
          navigation.goBack();
        }
        addNewDocument()
    }
  }

  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity style={styles.button2} onPress={console.log("no input")}>
  //         <Text style={styles.buttonText}>Add</Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, []);

  React.useEffect(() => {
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
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
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
      </View>
    </ScrollView>
  );
};

export default AddThread;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    marginTop: 0,
    marginBottom: 0,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: "right",
    alignItems: "top",
  },
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
