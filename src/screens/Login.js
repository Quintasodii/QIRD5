import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ImageBackground, Dimensions } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('screen')
const {height: screenHeight} = Dimensions.get('screen')


export default function Login(props) {
  return (
    <ImageBackground source={require('../assets/fondo_login.jpg')} style={styles.imagen}>
      <View style={styles.padre}>
        <Text style={styles.title}>Bienvenido</Text>

        <View style={styles.tarjeta}>
          <CustomInput placeholder='Usuario o Email'/>
          <CustomInput placeholder='Contraseña' secureTextEntry={true}/>

          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Recuperar')}>
              <Text style={styles.recuperar}>
                ¿Olvidaste tu contraseña?{' '}
                <Text style={{ color: '#00B2FF', textDecorationLine: 'underline' }}>Recuperar</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton botoncual='Ingresar' onPress={()=> props.navigation.navigate('MyTabs',{screen: 'Home'})}/>
          <View>
          <TouchableOpacity style={styles.gulugulu}>
            <Text style={styles.gulugulutext}>Ingresar con Google</Text>
          </TouchableOpacity>
        </View>
        </View>
      
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
            <Text style={styles.registrarse}>
              No tienes cuenta?{' '}
              <Text style={{ color: '#00B2FF', textDecorationLine: 'underline' }}>Registrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gulugulutext:{
    color: '#fff',
    fontSize: 20,
    
  },
  gulugulu:{
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth*0.68,
    height: screenHeight*0.061
  },
  padre: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imagen: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  title: {
    fontSize: 60,
    fontWeight: 'Bold',
    color: '#ffffff',
  },
  tarjeta: {
    margin: 20,
    marginBottom: 100,
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cajatexto: {
    paddingVertical: 20,
    backgroundColor: '#4D4D4D',
    borderRadius: 15,
    marginVertical: 10,
    height: 52,
    opacity: 0.5,
  },
  recuperar: {
    marginTop: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  padreboton: {
    alignItems: 'center',
  },
  cajaboton: {
    backgroundColor: '#00B2FF',
    borderRadius: 15,
    paddingVertical: 20,
    width: '100%',
    marginTop: 20,
    height: 60,
  },
  textoboton: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 18,
  },
  registrarse: {
    color: '#ffffff',
  },
});
