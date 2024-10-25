import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function Recuperar(props) {
  const [email, setEmail] = useState('');

  const handleRecuperar = async () => {
    let isError = false;
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Correo electrónico enviado', 'Se ha enviado un correo electrónico para recuperar tu contraseña');
    } catch (error) {
      console.log(error);
      Alert.alert('Correo inválido', 'Inténtalo de nuevo');
      isError = true;
    }
    if (!isError) {
      setTimeout(() => {
        props.navigation.navigate('Login');
      }, 1000);
    }
  };

  return (
    <ImageBackground source={require('../assets/fondo_registro.jpg')} style={styles.imagen}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar contraseña</Text>
        <View style={styles.input}>
          <CustomInput placeholder='Correo electrónico' value={email} onChangeText={(text) => setEmail(text)}/>
        </View>
        <CustomButton onPress={handleRecuperar} botoncual='Recuperar'/>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagen: {
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
  input: {
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#00B2FF',
    padding: 10,
    borderRadius: 15,
    width: '90%',
    height: 45,
    marginTop: '10%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});
