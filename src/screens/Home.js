import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import myImage from '../assets/fondo_home.png';
import Creditos from '../components/Creditos';

export default function Home() {
  return (
    <View style={styles.padre}>
      
      <View style={styles.billetera}>
      <Creditos/>
      </View>
      <View style={styles.wod}>
        <Text style={styles.wodtext}>Trabajo del día:</Text>
      </View>
      <View style={styles.wod}>
        <Text style={styles.wodtext}>Próxima clase:</Text>
      </View>
      <View style={styles.imagen}>
        <Image source={myImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    justifyContent: 'top',
    alignItems: 'center',
  },
  imagen: {
    width: '50%',
    height: '20%',
    marginTop: '15%',
    alignItems: 'center',
  },
  billetera: {
    marginTop: '25%',
  },
  creditos: {
    color: 'white',
    paddingTop: '5%',
    fontSize: 24,
    paddingLeft: '10%',
    fontWeight: 'semibold',
  },
  wod: {
    width: '90%',
    height: '10%',
    backgroundColor: '#333333',
    marginTop: '10%',
    borderRadius: 15,
  },
  wodtext: {
    color: '#cccccc',
    paddingTop: '4%',
    fontSize: 16,
    paddingLeft: '10%',
    fontWeight: 'semibold',
  },
});