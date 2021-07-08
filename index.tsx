import React, { useRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Suggestion from './src/Suggestion';
import Tag from './src/Tag';

export type Tag = any;
export type Suggestion = any;

export type AutocompleteTagsProps = {
  /** array of tags to render */
  tags: Tag[];

  /** array of all possible suggestions that the autocomplete pulls from */
  suggestions?: Suggestion[];

  /** function called when tags needs to be updated */
  onChangeTags: (newTags: Tag[]) => void;

  /** given a tag, returns the string that should be rendered in a Tag */
  labelExtractor: (tag: Tag) => string;

  /** called when a tag is pressed, instead of calling `onChangeTags` with the pressed tag removed */
  onTagPress?: (tag: Tag) => void;

  /** an array of characters that should trigger a new tag and clear the TextInput
   * @default [',', ' ', ';', '\n']  */
  parseChars?: string[];

  /** called when the user types a character in parseChars and should therefore add a new tag
   * if undefined, will call `onChangeTags` with `[...tags, userInputText]`
   */
  onAddNewTag?: (userInput: string) => void;

  /** whether or not to allow the user to create a Tag that doesn't come from `suggestions`
   * @default true
   */
  allowCustomTags?: boolean;

  /** called when a suggestion is pressed
   * defaultly calls `onChangeTags` with `[...tags, pressedSuggestion]`
   */
  onSuggestionPress?: (suggestion: Suggestion) => void;

  /** given a Suggestion, returns a string that can be compared to the user's search */
  suggestionExtractor?: (suggestion: Suggestion) => string;

  /** a function for filtering suggestions based on the TextInput value */
  filterSuggestions?: (text: string) => Suggestion[];

  /** a function that returns a custom tag component */
  renderTag?: (tag: Tag, onPress: (tag: Tag) => void) => JSX.Element;

  /** a function that returns a custom suggestion component */
  renderSuggestion?: (suggestion: Suggestion, onPress: (tag: Suggestion) => void) => JSX.Element;

  /** any custom TextInputProps */
  inputProps?: Partial<TextInputProps>;

  /** any additional FlatListProps */
  flatListProps?: Partial<FlatListProps<any>>;

  /** style for the outer-most View that houses both the tagContainer and suggestion list */
  containerStyle?: ViewStyle;

  /** styles for the container View that houses the tags and the input */
  tagContainerStyle?: ViewStyle;

  /** styles for the TextInput component */
  inputStyle?: TextStyle;

  /** styles for the FlatList that renders suggestions */
  flatListStyle?: ViewStyle;

  /** styles for the container View of FlatList that renders suggestions */
  flatListContainerStyle?: ViewStyle;
};

export const AutocompleteTags = ({
  tags,
  suggestions,
  labelExtractor,
  suggestionExtractor,
  onChangeTags,
  onTagPress,
  parseChars,
  allowCustomTags,
  onAddNewTag,
  onSuggestionPress,
  filterSuggestions,
  renderTag,
  renderSuggestion,
  containerStyle,
  tagContainerStyle,
  inputStyle,
  flatListStyle,
  flatListContainerStyle,
  inputProps,
  flatListProps,
}: AutocompleteTagsProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const extractor = suggestionExtractor || labelExtractor;

  const handleTagPress = (tag: Tag) => {
    if (onTagPress) {
      onTagPress(tag);
    } else {
      onChangeTags(tags.filter((t) => labelExtractor(t) !== labelExtractor(tag)));
    }
  };

  const handleSuggestionPress = (suggestion: Suggestion) => {
    setText('');
    if (onSuggestionPress) {
      onSuggestionPress(suggestion);
    } else {
      onChangeTags([...tags, suggestion]);
    }
    inputRef.current?.focus();
  };

  const handleTextChange = (input: string) => {
    setText(input);

    const lastTyped = input.charAt(input.length - 1);
    if (parseChars && parseChars.indexOf(lastTyped) > -1) {
      setText('');
      if (allowCustomTags) {
        const label = input.slice(0, -1);
        if (onAddNewTag) {
          onAddNewTag(label);
        } else {
          onChangeTags([...tags, label]);
        }
      }
    }
  };

  const renderTagComponent = (tag: Tag) => {
    const onPress = () => handleTagPress(tag);
    if (renderTag) {
      return renderTag(tag, onPress);
    }
    return <Tag label={labelExtractor(tag)} key={labelExtractor(tag)} onPress={onPress} />;
  };

  const renderSuggestionComponent = ({ item }: { item: Suggestion }) => {
    const onPress = () => handleSuggestionPress(item);
    if (renderSuggestion) {
      return renderSuggestion(item, onPress);
    }
    return <Suggestion label={extractor(item)} onPress={onPress} />;
  };

  const onKeyPress = ({ nativeEvent: { key } }: { nativeEvent: { key: string } }) => {
    if (text !== '' || key !== 'Backspace' || tags.length < 1) {
      return;
    }
    const updatedTags = [...tags];
    updatedTags.pop();
    onChangeTags(updatedTags);
  };

  const getSuggestions = () => {
    if (filterSuggestions) {
      return filterSuggestions(text);
    }
    if (!text || text === '') {
      return [];
    }
    const regex = new RegExp(`${text.trim()}`, 'i');
    return suggestions?.filter((item) => extractor(item).search(regex) >= 0);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.tagContainer, tagContainerStyle]}>
        {tags.map(renderTagComponent)}
        <TextInput
          value={text}
          onKeyPress={onKeyPress}
          ref={inputRef}
          onChangeText={handleTextChange}
          style={[styles.input, inputStyle]}
          {...inputProps}
        />
      </View>
      <View style={flatListContainerStyle}>
        <FlatList
          data={getSuggestions()}
          keyExtractor={extractor}
          renderItem={renderSuggestionComponent}
          keyboardShouldPersistTaps="handled"
          style={[styles.list, flatListStyle]}
          {...flatListProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2000,
    width: '100%',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: 100,
  },
  list: {
    maxHeight: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

AutocompleteTags.defaultProps = {
  parseChars: [',', ' ', ';', '\n'],
  allowCustomTags: true,
  suggestions: [],
};

export default AutocompleteTags;
