import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomAlert from '../components/AlertPerso';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';



const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const Registro = async () => {


    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firestore().collection('Users').doc(user.uid).set({
        nombreCompleto,
        email,
        clases_reservadas: [null],
        gender: selectedGender,
        role: false,
        User_ID: user.uid
      });

      setAlertMessage('Registro exitoso!');
      setAlertType('success');
      setAlertVisible(true);
      props.navigation.navigate('Login');
    } catch (error) {
      setAlertMessage('Error al registrar: ' + error.message);
      setAlertType('error');
      setAlertVisible(true);
      console.log(error);
    }
  };

  const handleDismiss = () => {
    setAlertVisible(false);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <ImageBackground source={require('../assets/fondo_registro.jpg')} style={styles.imagen}>
      <View style={styles.padre}>
        <Text style={styles.title}>Registro</Text>

        <CustomInput
          placeholder='Nombre Completo'
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
        />
        <CustomInput
          placeholder='Correo Electrónico'
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder='Contraseña'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.selectorgenero}>
           <TouchableOpacity style={[styles.genderButton, selectedGender=== 'Masculino' && styles.selectedButton]} onPress={()=> handleGenderSelect('Masculino')}>
              <Text style={[styles.BotonTextoMF , selectedGender === 'Masculino' && styles.selectedButtonText]}>Masculino</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.genderButton, selectedGender=== 'Femenino' && styles.selectedButton]} onPress={()=> handleGenderSelect('Femenino')}>
             <Text style={[styles.BotonTextoMF , selectedGender === 'Femenino' && styles.selectedButtonText]}>Femenino</Text>
           </TouchableOpacity>
        </View>
        <View>
          <CustomButton botoncual='REGISTRAR' onPress={Registro} />
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.registrarse}>
            ¿Ya tienes cuenta?{' '}
            <Text style={{ color: '#00B2FF', textDecorationLine: 'underline' }}>
              Iniciar Sesión
            </Text>
          </Text>
        </TouchableOpacity>

        {alertVisible && (
          <CustomAlert message={alertMessage} onDismiss={handleDismiss} type={alertType} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    opacity: 0.80,
  },
  title: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 35
  },
  registrarse: {
    color: '#ffffff',
    marginTop: 20,
    textAlign: 'center',
  },
  selectorgenero:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 10,
    marginBottom: 20
  },
  genderButton:{
    flex: 1,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#434334', 
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#00B2FF',
  },
  BotonTextoMF:{
    fontSize: 17,
    color: '#fff',
    fontWeight: '800'
  },
  selectedButtonText:{
    color: '#000',
  },

});

export default Register;
