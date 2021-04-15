import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import COLORS from '../config/COLORS';
const SearchBar = ({containerStyle}) => {
  return (
    <View style={[styles.container, {containerStyle}]}>
      <TextInput styles={styles.searchBar} placeholder="Search here..." />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: COLORS.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
});
