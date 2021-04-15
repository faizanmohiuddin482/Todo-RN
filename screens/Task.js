import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Task = ({item, onPress}) => {
  const {title, date, description} = item;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 10,
    width: width / 2 - 10,
  },
});

export default Task;
