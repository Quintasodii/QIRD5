import React from 'react';
import { StyleSheet, Pressable, Text, TouchableOpacity } from 'react-native';

const IconButton = ({ name, size = 30, color = 'black', onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.backIcon, style]} onPress={onPress}>
      <Text>MAS MAS Y MAS</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default IconButton;
