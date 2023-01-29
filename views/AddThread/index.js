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
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
} from "firebase/firestore";
import moment from "moment";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddThread = ({ route }) => {  
  const navigation = useNavigation();
  const entityRef = collection(db, "threads");
  const [entityText, setEntityText] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);
  const tags = ["Lost and Found", "Ticket Control", "Delays", "Construction", "Meetup", "Rideshare", "Ticketshare"];
  const lines = ["U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "S1", "S2", "S3", "S4", "S6", "S7", "S8", "S20"];
  const lineColors = {
    "U1": "#52822f", 
    "U2": "#c20831",
    "U3": "#ec6725",
    "U4": "#00a984",
    "U5": "#bc7a00",
    "U6": "#0065ae",
    "U7": "#c76572",
    "U8": "#e79da9",
    "S1": "#16bae7",
    "S2": "#76b82a",
    "S3": "#951b81",
    "S4": "#e3051b",
    "S6": "#008d58",
    "S7": "#892e22",
    "S8": "#000000",
    "S20": "#ea516d",
    };
  const lineColorMap = new Map(Object.entries(lineColors));

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
          lineColor: lineColorMap.get(selectedLine),
          stationName: selectedLocation?.name,
          tag: selectedTags,
          lineNumber: selectedLine,
          motherThreadID: "",
          //threadID: "",
          numberOfComments: 0,
          locationID: selectedLocation?.id,
          timeStamp: moment().format(),
          latestTimeAlive: moment().format(),
        };
        const docRef = await addDoc(entityRef, data);
        data.threadID = docRef.id;
        setDoc(docRef, data)
        .then(docRef => {
            console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
        console.log("Document written with ID: ", docRef.id);
        console.log("Data when adding thread: ", data);
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
      <View style={styles.tagContainer}>
          {lines.map((line, index) => (
              <TouchableOpacity key={index} style={[{
                ...styles.tagButton,
                backgroundColor: lineColorMap.get(line)}, selectedLine == line && styles.selectedTagButton]} 
                onPress={() => {
                  setSelectedLine(line);
              }}>
                  <Text style={[styles.lineText, selectedLine == line && styles.selectedTagText]}>{line}</Text>
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
    </ScrollView>
  );
};

export default AddThread;

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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  selectedTagButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: 'green',

  },
  tagButton: {
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tagText: {
    color: '#555555',
  },
  selectedTagText: {
    fontWeight: 'bold',
    color: 'black',
  },
  lineText: {
    color: "white",
    fontWeight: "500",
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
