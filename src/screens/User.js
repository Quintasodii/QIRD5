import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import kakaka from '../assets/PERFILAO.png';

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

export default function User(props) {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      setUid(uid);

      firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          } else {
            console.log('No se encontró el usuario asociado al UID');
          }
        })
        .catch(error => {
          console.log(error);
        });

      firestore()
        .collection('HistoricoTokens')
        .where('User_ID', '==', uid)
        .get()
        .then(querySnapshot => {
          const TokenHistorico = [];
          querySnapshot.forEach(doc => {
            TokenHistorico.push({ id: doc.id, ...doc.data() });
          });
          setTokens(TokenHistorico);
        })
        .catch(error => {
          console.log('No se pudo traer el historico', error);
        });
    } else {
      console.log('No existe tal usuario entre nos');
    }
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        props.navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#0e0e0e'}}>
      <View style={styles.padre}>
        <View style={styles.container}>
          <View style={styles.ImagenPerfil}>
            <Image source={kakaka} />
          </View>
          {userData ? (
            <View style={styles.NombreGenero}>
              <Text style={styles.NOMBREE}>{userData.nombreCompleto}</Text>
              <Text style={styles.GENEROO}>{userData.gender}</Text>
            </View>
          ) : (
            <ActivityIndicator color='#fcf' />
          )}
        </View>
        <View style={styles.COREOS}>
          <Text style={styles.COREOTXT}>Correo electrónico: </Text>
          {userData ? (
            <Text style={styles.ERMAIL}>{userData.email}</Text>
          ) : (
            <ActivityIndicator color='#fff' />
          )}
        </View>
        <View style={styles.COREOS}>
          <Text style={styles.COREOTXT}>Teléfono: </Text>
          {userData ? (
            <Text style={styles.ERMAIL}>{userData.TEL}</Text>
          ) : (
            <ActivityIndicator color='#ffg' />
          )}
        </View>

        <View style={styles.separador} />

        <View style={styles.Registros}>
          <Text style={styles.REGISTROTITU}>Registro de Compra</Text>
          <ScrollView>
            {tokens.length > 0 ? (
              tokens.map(token => (
                <View key={token.id}>
                  <TouchableOpacity>
                    <Text style={styles.Registermodules}>{token.Fecha}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View>
                <Text style={{ color: '#009BDE' }}>No hay registro de tokens</Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.separador} />
        </View>
        <View style={styles.conflogut}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ImagenPerfil: {
    marginLeft: 10
  },
  padre: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    paddingBottom: 80, // Ajuste para evitar que el contenido sea tapado
  },
  container: {
    height: '15%',
    backgroundColor: '#0e0e0e',
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2
  },
  NOMBREE: {
    fontSize: 28,
    color: 'white',
    marginRight: 15,
    marginTop: 20,
    textAlign: 'right'
  },
  GENEROO: {
    fontSize: 24,
    color: 'white',
    textAlign: 'right',
    marginRight: 15,
    marginTop: 5,
  },
  CorreoTelefono: {
    backgroundColor: '#0e0e0e',
    height: 80
  },
  COREOS: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30
  },
  ERMAIL: {
    fontSize: 18,
    textAlign: 'right',
    color: '#fff'
  },
  COREOTXT: {
    fontSize: 18,
    textAlign: 'left',
    color: '#fff',
  },
  separador: {
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: screenWidth * 0.8,
    height: 2,
    borderRadius: 14,
  },
  Registros: {
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    height: 370
  },
  REGISTROTITU: {
    fontSize: 30,
    color: '#fff',
    marginTop: 14,
    marginBottom: 27
  },
  Registermodules: {
    color: '#009BDE',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#009BDE'
  },
  logout: {
    color: '#821',
    fontSize: 20,
    marginTop: 40
  },
  conflogut: {
    alignItems: 'center'
  }
});
