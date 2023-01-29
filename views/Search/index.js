import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import MeiliSearch from "meilisearch";

const client = new MeiliSearch({
  host: "http://34.65.82.213",
  apiKey: "MAPPIT",
});
const index = client.index("threads");

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleSearch = async (text) => {
    setQuery(text);
    await index.search(text).then((res) => {
      setSearchResults(res.hits);
      // console.log(res.hits);
    });
  };
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <SearchBar
        placeholder="Search in threads..."
        onChangeText={handleSearch}
        value={query}
        lightTheme
        // round
        containerStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{
          borderRadius: 40,
          // backgroundColor: "#fff",
          // borderColor: "#696969",
        }}
        leftIconContainerStyle={{ paddingLeft: 10 }}
        platform="ios"
        onCancel={() => {
          navigation.goBack();
        }}
        autoFocus
      />
      {/* {searchResults.length > 0 && query.length > 1 && ( */}
      <ScrollView>
        {searchResults?.map((result, index) => (
          <TouchableOpacity
            onPress={() => {
              console.log(result);
              navigation.navigate("ReadThread", { threadData: result });
            }}
            key={index}
          >
            <View style={styles.searchResultContainer} item={result}>
              <Text>{result.content}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* )} */}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  searchResultContainer: {
    marginTop: 3,
    padding: 10,
    backgroundColor: "white",
  },
});
