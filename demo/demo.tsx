import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
// import AutocompleteTags from 'react-native-autocomplete-tags';
import AutocompleteTags from '../index';

type Suggestion = {
  name: string;
  email: string;
};

const suggestions = [
  { name: 'Boris Yeltsin', email: 'boris.yeltsin@abc.com ' },
  { name: 'Tom Boboby', email: 'tom.boboy@abc.com' },
];

const Demo = () => {
  const [tags, setTags] = useState<Suggestion[]>([
    { name: 'Fred Hendriks', email: 'fred.hendricks@abc.com' },
  ]);

  const onAddNewTag = (input: string) => {
    setTags((tags) => [...tags, { name: input, email: input }]);
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
          suggestions={suggestions}
          labelExtractor={(item) => item.name}
          suggestionExtractor={(item) => item.email}
          onChangeTags={(tags) => setTags(tags)}
          onAddNewTag={onAddNewTag}
          inputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
          containerStyle={{ backgroundColor: 'yellow' }}
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
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: '#262626',
    borderBottomWidth: 0.5,
    padding: 8,
  },
});

export default Demo;
