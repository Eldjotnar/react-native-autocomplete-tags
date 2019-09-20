import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  ViewPropTypes,
  Text
} from "react-native";
import Tag from "./src/Tag";
import Suggestion from "./src/Suggestion";

const BACKSPACE = "Backspace";

export const AutocompleteTags = ({
  tags,
  labelExtractor,
  text,
  onChangeText,
  onChangeTags,
  minInputWidth,
  suggestions,
  suggestionExtractor,
  onSuggestionPress,
  renderSuggestion,
  renderTag,
  inputProps,
  flatListProps,
  containerStyle,
  tagContainerStyle,
  inputContainerStyle,
  inputStyle,
  tagStyle,
  tagTextStyle,
  suggestionContainerStyle,
  suggestionStyle,
  filterSuggestions,
  suggestionTextStyle,
  onTagPress
}) => {
  const inputRef = useRef(null);
  const extractor = suggestionExtractor || labelExtractor;

  const onKeyPress = ({ nativeEvent: { key } }) => {
    if (text !== "" || key !== BACKSPACE) {
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
    if (!text || text === "") {
      return [];
    }
    const regex = new RegExp(`${text.trim()}`, "i");
    return suggestions.filter(item => extractor(item).search(regex) >= 0);
  };

  const handleSuggestionPress = suggestion => {
    onSuggestionPress(suggestion);
    inputRef.current.focus();
  };

  const handleTagPress = tag => {
    if (onTagPress) {
      onTagPress(tag);
    } else {
      onChangeTags(tags.filter(a => a !== tag));
    }
  };

  // eslint-disable-next-line react/prop-types
  const renderSuggestionItem = ({ item }) => {
    if (renderSuggestion) {
      return renderSuggestion(item);
    }
    return (
      <Suggestion
        label={extractor(item)}
        onPress={() => handleSuggestionPress(item)}
        style={suggestionStyle}
        textStyle={suggestionTextStyle}
      />
    );
  };

  const renderTagItem = item => {
    if (renderTag) {
      return renderTag(item);
    }
    return (
      <Tag
        label={labelExtractor(item)}
        key={labelExtractor(item)}
        style={tagStyle}
        textStyle={tagTextStyle}
        onPress={() => handleTagPress(item)}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.tagContainer, tagContainerStyle]}>
        {tags.map(a => renderTagItem(a))}
        <View
          style={[
            styles.inputContainer,
            inputContainerStyle,
            { flexBasis: minInputWidth }
          ]}
        >
          <TextInput
            value={text}
            onChangeText={onChangeText}
            onKeyPress={onKeyPress}
            ref={inputRef}
            style={[styles.input, inputStyle]}
            {...inputProps}
          />
        </View>
      </View>
      <View>
        <View style={styles.absoluteList}>
          <FlatList
            data={getSuggestions(suggestions)}
            keyExtractor={a => labelExtractor(a)}
            keyboardShouldPersistTaps="handled"
            renderItem={renderSuggestionItem}
            contentContainerStyle={suggestionContainerStyle}
            {...flatListProps}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2000,
    flex: 1
  },
  tagContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    flexWrap: "wrap"
  },
  inputContainer: {
    flexGrow: 1
  },
  input: {},
  relativeList: {},
  absoluteList: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0
  }
});

AutocompleteTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  labelExtractor: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeTags: PropTypes.func.isRequired,
  minInputWidth: PropTypes.number,
  suggestions: PropTypes.arrayOf(PropTypes.any),
  suggestionExtractor: PropTypes.func,
  onSuggestionPress: PropTypes.func,
  onTagPress: PropTypes.func,
  renderSuggestion: PropTypes.func,
  renderTag: PropTypes.func,
  filterSuggestions: PropTypes.func,
  inputProps: PropTypes.shape(TextInput.propTypes),
  flatListProps: PropTypes.shape(FlatList.propTypes),
  containerStyle: ViewPropTypes.style,
  tagContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: ViewPropTypes.style,
  tagStyle: ViewPropTypes.style,
  tagTextStyle: Text.propTypes.style,
  suggestionStyle: ViewPropTypes.style,
  suggestionContainerStyle: ViewPropTypes.style,
  suggestionTextStyle: Text.propTypes.style
};

AutocompleteTags.defaultProps = {
  minInputWidth: 100,
  suggestions: [],
  suggestionExtractor: () => {},
  onSuggestionPress: null,
  renderSuggestion: null,
  renderTag: null,
  inputProps: null,
  flatListProps: null,
  tagContainerStyle: null,
  inputContainerStyle: null,
  inputStyle: null,
  tagStyle: null,
  tagTextStyle: null,
  suggestionStyle: null,
  suggestionContainerStyle: null,
  filterSuggestions: null,
  onTagPress: null,
  containerStyle: null,
  suggestionTextStyle: null
};

export default AutocompleteTags;
