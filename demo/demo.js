import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import AutocompleteTags from "react-native-autocomplete-tags";

const suggestions = [
  { name: "Boris Yeltsin", email: "boris.yeltsin@abc.com " },
  { name: "Tom Boboby", email: "tom.boboy@abc.com" }
];

const Demo = () => {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([
    { name: "Fred Hendriks", email: "fred.hendricks@abc.com" }
  ]);

  const onChangeText = text => {
    setText(text);

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [",", " ", ";", "\n"];

    if (parseWhen.indexOf(lastTyped) > -1) {
      setTags(tags => [...tags, { name: text, email: text }]);
      setText("");
    }
  };

  const handleSuggestionPress = suggestion => {
    setText("");
    setTags(tags => [...tags, suggestion]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>Subject: DEMO</Text>
      </View>
      <View style={[styles.rowContainer, { zIndex: 2000 }]}>
        <Text>To: </Text>
        <AutocompleteTags
          tags={tags}
          labelExtractor={item => item.name}
          text={text}
          onChangeText={onChangeText}
          onChangeTags={tags => setTags(tags)}
          suggestions={suggestions}
          suggestionExtractor={item => item.email}
          onSuggestionPress={handleSuggestionPress}
          tagContainerStyle={{ backgroundColor: "white" }}
          inputProps={{
            autoCapitalize: "none",
            autoCorrect: false
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text>Body:</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomColor: "#262626",
    borderBottomWidth: 0.5,
    padding: 8
  }
});

export default Demo;
