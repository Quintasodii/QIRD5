import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, ImageBackground, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const {width, screenWidth} = Dimensions.get('screen')
const {height, screenHeight} = Dimensions.get('screen')

export default function Login(props) {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');

  const logueo = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      const userDoc = await firestore().collection('Users').doc(uid).get();

      if (userDoc.exists) {
        console.log('todo bien')
      } else {
        Alert.alert('Error', 'No se encontró el usuario en la base de datos.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Algo salió mal durante el inicio de sesión.');
    }
  };

  return (
    <ImageBackground source={require('../assets/fondo_login.jpg')} style={styles.imagen}>
      <View style={styles.padre}>
        <Text style={styles.title}>Bienvenido</Text>

        <View style={styles.tarjeta}>
          <View style={styles.cajatexto}>
            <CustomInput placeholder='Correo electrónico' onChangeText={setEmail} style={styles.cajatexto} />
          </View>
          <View style={styles.cajatexto}>
            <CustomInput placeholder='Contraseña' onChangeText={setPassword} secureTextEntry={true} />
          </View>

          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Recuperar')}>
              <Text style={styles.recuperar}>
                ¿Olvidaste tu contraseña?{' '}
                <Text style={{ color: '#00B2FF', textDecorationLine: 'underline' }}>Recuperar</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.padreboton}>
            <CustomButton botoncual='Ingresar' onPress={logueo} />
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
  cajatexto:{
    paddingVertical: 20,
    backgroundColor: '#4d4d4d',
    borderRadius: 15,
    marginVertical: 10,
    width: screenWidth*0.85,
    height: screenHeight*0.055,
    opacity: 0.5
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
    fontWeight: '500',
    color: '#ffffff',
  },
  tarjeta: {
    margin: 20,
    marginBottom: 100,
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '90%',
    padding: 20,
  },
  cajatexto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recuperar: {
    marginTop: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  padreboton: {
    alignItems: 'center',
  },
  registrarse: {
    color: '#ffffff',
  },
});
