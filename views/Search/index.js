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
import Ionicons from 'react-native-vector-icons/Ionicons';

const client = new MeiliSearch({
  host: "http://34.65.82.213",
  apiKey: "MAPPIT",
});
const index = client.index("threads");
index.updateSettings({
  filterableAttributes: ['lineNumber', 'tag'],
});

import tags from '../../data/tags.json';
import lineColors from '../../data/line_colors.json';
import lines from '../../data/lines.json';
const lineColorMap = new Map(Object.entries(lineColors));

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (selectedLines || selectedTags) {
      handleSearch(query);
    }
  }, [selectedLines, selectedTags]);

  const handleSearch = async (text) => {
    setQuery(text);
    lineFilter = []
    selectedLines.forEach((line) => {
      lineFilter.push("lineNumber = ".concat(line));
    });
    tagFilter = []
    selectedTags.forEach((tag) => {
      tagFilter.push("tag = \""+tag+"\"");
    });
    const filter = [lineFilter, tagFilter];
    await index.search(text, { filter }).then((res) => {
      setSearchResults(res.hits);
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
      <View>
      <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.showFiltersButton}>
    <Text style={styles.showFiltersText}>{showFilters ? "Hide filters" : "Show filters"}</Text>
    {showFilters ? (
      <Ionicons name="ios-arrow-up" size={20} color="#333" />
    ) : (
      <Ionicons name="ios-arrow-down" size={20} color="#333" />
    )}
  </TouchableOpacity>
        {showFilters && (
          <>

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
                    backgroundColor: lineColorMap.get(line)}, selectedLines.includes(line) && styles.selectedTagButton]} 
                    onPress={() => {
                      if (selectedLines.includes(line)) {
                        setSelectedLines(selectedLines.filter(selectedLine => selectedLine !== line));
                      } else {
                        setSelectedLines([...selectedLines, line]);
                      }
                }}>
                      <Text style={[styles.lineText, selectedLines.includes(line) && styles.selectedTagText]}>{line}</Text>
                  </TouchableOpacity>
              ))}
          </View>
          </>
  )}
</View>
      {/* {searchResults.length > 0 && query.length > 1 && ( */}
      <ScrollView style={styles.searchResultsContainer}>
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
  searchResultsContainer: {
    height:10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  selectedTagButton: {
    backgroundColor: 'white',
    margin: 5,
    borderWidth: 2,
    borderColor: 'green',
  },
  tagButton: {
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
  showFiltersButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showFiltersText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },

});
