import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

const Suggestion = ({ label, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <Text style={[styles.label, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 3,
    backgroundColor: "white",
    borderColor: "#262626",
    borderWidth: 0.5
  },
  label: {
    color: "#262626"
  }
});

Suggestion.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style
};

Suggestion.defaultProps = {
  style: null,
  textStyle: null
};

export default Suggestion;
