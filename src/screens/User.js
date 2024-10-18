import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'; // Importa la función de formateo
import { ScrollView } from 'react-native-gesture-handler';
import IconButton from '../components/IconButton';
import kakaka from '../assets/add_circle.png';

export default function User(props) {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      setUid(uid);

      // Obtener datos del usuario
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

      // Obtener el historial de tokens
      firestore()
        .collection('HistoricoTokens')
        .where('User_ID', '==', uid)
        .get()
        .then(querySnapshot => {
          const TokenHistorico = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            // Asegúrate de que 'Fecha' es un Timestamp y conviértelo
            const formattedDate = data.Fecha ? format(data.Fecha.toDate(), 'dd/MM/yyyy') : 'Fecha no disponible'; 
            TokenHistorico.push({ id: doc.id, Fecha: formattedDate, ...data });
          });
          setTokens(TokenHistorico);
        })
        .catch(error => {
          console.log('No se pudo traer el historicon', error);
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
    <View style={styles.padre}>
      <View>
        <IconButton name={kakaka} onPress={handleLogout} />
      </View>
      <View style={styles.Contingente}>
        <View style={styles.ImagenPerfil}></View>
        {userData ? (
          <View style={styles.NombreGenero}>
            <Text style={styles.NOMBREE}>{userData.nombreCompleto}</Text>
            <Text style={styles.GENEROO}>{userData.gender}</Text>
          </View>
        ) : (
          <ActivityIndicator color='#fcf' />
        )}
      </View>
      <View style={styles.CorreoTelefono}>
        {userData ? (
          <Text style={{ color: '#fff' }}>Correo Electrónico: {userData.email}</Text>
        ) : (
          <ActivityIndicator color='#fff' />
        )}
        {userData ? (
          <Text style={{ color: '#fff' }}>Teléfono: example</Text>
        ) : (
          <ActivityIndicator color='#fff' />
        )}
      </View>
      <View style={styles.Registros}>
        <Text style={styles.REGISTROTITU}>Registro de Compra</Text>
        <ScrollView>
          {tokens.length > 0 ? (
            tokens.map(token => (
              <View key={token.id}>
                <TouchableOpacity style={{ color: '#fff' }}>
                  <Text style={{ color: '#fff' }}>{token.Fecha}</Text> {/* Renderiza la fecha aquí */}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View>
              <Text style={{ color: '#fff' }}>No hay registro de tokens</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#0E0E0E',
  },
  container: {
    height: '15%',
    backgroundColor: '#0E0E0E',
    width: '100%',
    marginTop: '20%',
  },
  title: {
    fontSize: 50,
    color: 'white',
    margin: '5%',
  },
});
