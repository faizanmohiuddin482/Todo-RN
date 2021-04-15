import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AntDesign} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../config/COLORS';
export default function RoundButtonIcon({
  antIconName,
  color,
  size,
  onPress,
  style,
}) {
  return (
    <Icon
      name={antIconName || 'md-create'}
      size={size || 24}
      color={color || COLORS.LIGHT}
      onPress={onPress}
      style={[styles.icon, {...style}]}
    />
  );
}
const styles = StyleSheet.create({
  icon: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
