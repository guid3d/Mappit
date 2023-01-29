import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
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
    const results = await index.search(text);
    setSearchResults(results.hits);
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
        showCancel
      />
      {searchResults.length > 0 && query.length > 1 && (
        <View>
          {searchResults.map((result, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ReadThread", { threadData: result })
              }
              key={index}
            >
              <View style={styles.container} item={result}>
                <Text>{result.content}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
});
