import SearchBar from "@/components/search";
import { useAutoComplete, useNamed, useSearch } from "@/hooks/useSearch";
import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [press, setPress] = React.useState(false);

  const [result, setResult] = React.useState<any[]>([]);
  const [autofill, setAutofill] = React.useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setPress(true);

      useAutoComplete(searchQuery).then((data) => {
        setAutofill(data.data);
      });
    } else {
      setPress(false);
    }
  }, [searchQuery]);

  const onPress = () => {
    useSearch(searchQuery).then((data) => {
      setResult(data.data);
      setPress(false);
    });
  };

  const pressedQuerry = (card: string) => {
    setPress(false);
    setSearchQuery(card);
    useNamed(card).then((data) => {
      setResult(data);
      setPress(false);
    });
  };

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.defaultText}>Mini Scryfall</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPress={onPress}
      />

      {press ? (
        <View style={styles.fillBox}>
          {autofill ? (
            autofill.map((card) => (
              <Pressable key={card} onPress={() => pressedQuerry(card)}>
                <Text style={styles.searchText}>{card}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.searchText}>Search for a card</Text>
          )}
        </View>
      ) : (
        <ScrollView>
          <View style={styles.grid}>
            {result.map((card) => (
              <Image
                source={{ uri: card?.image_uris?.normal }}
                style={styles.card}
                key={card.id}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 32,
    top: 100,
    gap: 8,
  },
  defaultText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  searchText: {
    fontSize: 20,
    color: "black",
  },
  fillBox: {
    width: "100%",
    opacity: 0.5,
    backgroundColor: "white",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 8,
  },
  grid: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 8,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  card: { width: 128, height: 164 },
});
