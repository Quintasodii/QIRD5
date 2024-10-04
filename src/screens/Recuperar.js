import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function Recuperar(props) {

  return (
    <ImageBackground source={require('../assets/fondo_registro.jpg')} style={styles.imagen}>
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <CustomInput placeholder='Correo electrónico'/>
    <CustomButton botoncual='Enviar'/>
    <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{color:'#fff'}}>
              Ya tienes cuenta? <Text style={{ color: '#00B2FF', textDecorationLine: 'underline' }}>Iniciar Sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    imagen:{
        width: '100%',
        height: '100%',
        opacity: 0.80,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
});