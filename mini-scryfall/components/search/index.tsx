import * as React from "react";
import { Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

interface PropsSearch {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  onPress: () => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, onPress }: PropsSearch) => {
  return (
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={onPress}
      />
  );
};

export default SearchBar;
