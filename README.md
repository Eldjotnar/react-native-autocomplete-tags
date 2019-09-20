# react-native-autocomplete-tags

A quick and easy solutions for projects that need an input with both autocomplete and tags

<img src="example.gif" style="max-width: 500px">

## Features

- custom tag and suggestions
- fully style-able
- extractors for tags and for suggestions
- easy to integrate and use
- controlled text input

## Installation

```
yarn add react-native-autocomplete-tags
```

or

```
npm install react-native-autocomplete-tags --save
```

## Dependency

**Requires RN >= 0.59**

## Useage

Also see [the demo projects](demo/demo.js)

```jsx
const suggestions = [
  { name: "Boris Yeltsin", email: "boris.yeltsin@abc.com" },
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
        />
      </View>
    </SafeAreaView>
  );
};
```

## Props

| Prop                      | type              | Description                                                          | required | default                  |
| ------------------------- | ----------------- | -------------------------------------------------------------------- | -------- | ------------------------ |
| **`tags`**                | `array` of any    | The current tags to be rendered                                      | `true`   |                          |
| **`labelExtractor`**      | `function`        | Determines what property of `tags` is displayed                      | `true`   |                          |
| **`text`**                | `string`          | value of `TextInput`                                                 | `true`   |                          |
| **`onChangeText`**        | `function`        | called when `text` changes, should also handle tag creation          | `true`   |                          |
| **`onChangeTags`**        | `function`        | called when tags change (i.e. by deleting), should just write `tags` | `true`   |                          |
| **`minInputWidth`**       | `number`          | minimum width of `TextInput` before jumping to new line              | `false`  | `100`                    |
| **`suggestions`**         | `array` of any    | All possible suggestions                                             | `false`  | `[]`                     |
| **`suggestionExtractor`** | `function`        | determines which property of `suggestions` is displayed              | `false`  | same as `labelExtractor` |
| **`onSuggestionPress`**   | `function`        | called when suggestion is pressed                                    | `false`  | `null`                   |
| **`onTagPress`**          | `function`        | called when tag is pressed                                           | `false`  | `null`                   |
| **`renderSuggestion`**    | `function`        | renders a custom suggestion item                                     | `false`  | `null`                   |
| **`renderTag`**           | `function`        | renders a custom tag                                                 | `false`  | `null`                   |
| **`filterSuggestions`**   | `function`        | filters suggestions based on `text` (receives `text` as parameter)   | `false`  | `null`                   |
| **`inputProps`**          | `TextInput` props | any additional props for `TextInput`                                 | `false`  | `null`                   |
| **`flatListProps`**       | `FlatList` props  | any additional props for `FlatList`                                  | `false`  | `null`                   |

### Style Props

No style props are required.

| Prop                           | Description                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| **`containerStyle`**           | The outmost container which contains the `TextInput` and the `FlatList` of `suggestions` |
| **`tagContainerStyle`**        | Container for the `tags` and the `TextInput`                                             |
| **`inputContainerStyle`**      | Container around the `TextInput`                                                         |
| **`inputStyle`**               | Applied to the `TextInput` directly                                                      |
| **`tagStyle`**                 | Applied to each tag                                                                      |
| **`tagTextStyle`**             | Applied to the tag label                                                                 |
| **`suggestionStyle`**          | Applied to each suggestion                                                               |
| **`suggestionContainerStyle`** | Applied to the `FlatList` which renders `suggestions`                                    |
| **`suggestionTextStyle`**      | Applied to the suggestion label                                                          |

## Contributing

PRs and issues welcome!
