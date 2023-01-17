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
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; 
import { Timestamp } from "@firebase/firestore";
import moment from "moment";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddThread = ({ route }) => {  
  const navigation = useNavigation();
  const entityRef = collection(db, 'threads')
  const [entityText, setEntityText] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = ["Lost and Found", "Ticket Control", "Delays", "Construction", "Meetup", "Rideshare", "Ticketshare", "U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S20"];

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0 && selectedLocation?.id) {
        async function addNewDocument() {
          const data = {
            childThreadID: "",
            commentIDArray: [],
            content: entityText,
            creatorName: creator,
            likes: 0,
            stationName: selectedLocation?.name,
            tag: selectedTags,
            motherThreadID: "",
            numberOfComments: 0,
            threadID: 0,
            locationID: selectedLocation?.id,
            timeStamp: moment().format(),
            timeToLast: 3000,
          };
          const docRef = await addDoc(entityRef, data);
          console.log("Document written with ID: ", docRef.id);
          setEntityText('');
          Keyboard.dismiss();
          navigation.goBack();
        }
        addNewDocument();
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
  }, [entityText, creator]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tagButton} onPress={() => {
              if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}>
              <Text style={[styles.tagText, selectedTags.includes(tag) && styles.selectedTagText]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tagButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  tagText: {
    color: '#555555',
    fontWeight: 'bold'
  },
  selectedTagText: {
    backgroundColor: '#555555',
    color: 'white'
  }
});
