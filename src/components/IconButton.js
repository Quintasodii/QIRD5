import React from 'react';
import { StyleSheet, Pressable, Text, TouchableOpacity, Image } from 'react-native';


const IconButton = ({ name, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.backIcon, style]} onPress={onPress}>
      <Image source={name} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    width: 40,
    height: 40
  }
});

export default IconButton;