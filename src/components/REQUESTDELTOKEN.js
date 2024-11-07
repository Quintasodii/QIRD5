import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import IconButton from './IconButton';
import kikiriki from '../assets/chiquicheck.png';
import kikiriko from '../assets/closechiquito.png';
import { format } from 'date-fns';


const handlereject = async (perfu) => {
  try {
    const tokaborrar = await firestore().collection('TokenRequest').doc(perfu.id).get();
    const fechaTimestamp = tokaborrar.data().Fecha.toDate();
    const fechaFormateada = format(fechaTimestamp, 'yyyy/MM/dd');
    await firestore().collection('TokenRequest').doc(perfu.id).delete();
    await firestore().collection('HistoricoTokens').add({
      Estado: 'Rechazado',
      Fecha: fechaFormateada,
      MetodoPago: tokaborrar.data().MetodoPago,
      User_ID: tokaborrar.data().User_ID,
      PlanToken: tokaborrar.data().PlanToken,
    });
  } catch (error) {
    console.log(error, 'ALGO ANDA MAL SEÑOR STARK');
  }
};

const handleaccept = async (perfu2) => {
  try {
    const tokaborrar = await firestore().collection('TokenRequest').doc(perfu2.id).get();
    const fechaTimestamp = tokaborrar.data().Fecha.toDate();
    const fechaFormateada = format(fechaTimestamp, 'yyyy/MM/dd');
    await firestore().collection('TokenRequest').doc(perfu2.id).delete();
    await firestore().collection('HistoricoTokens').add({
      Estado: 'Aceptado',
      Fecha: fechaFormateada,
      User_ID: tokaborrar.data().User_ID,
      PlanToken: tokaborrar.data().PlanToken,
    });
    const usererere = await firestore().collection('Users').doc(tokaborrar.data().User_ID).get();
    await firestore().collection('Users').doc(tokaborrar.data().User_ID).update({
      Creditos: usererere.data().Creditos + tokaborrar.data().PlanToken,
    });
  } catch (error) {
    Alert.alert('Error', 'No se pudo procesar la solicitud');
  }
};

const REQUESTDELTOKEN = ({ tokid }) => {
  const [tokenData, setTokenData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      const tokrekDoc = await firestore().collection('TokenRequest').doc(tokid).get();
      setTokenData(tokrekDoc.data());
      const usererDoc = await firestore().collection('Users').doc(tokrekDoc.data().User_ID).get();
      setUserData(usererDoc.data());
    };
    fetchTokenData();
  }, [tokid]);

  if (!tokenData || !userData) return null;


  return (
    <View style={styles.container}>
      <View style={styles.identificador}>
        <Text style={styles.NOMBRE}>{userData.nombreCompleto}</Text>
        <View style={styles.infoplis}>
          <Text style={styles.PRECIO}>Plan: </Text>
          <Text style={styles.METODO}>{tokenData.PlanToken}</Text>
          <Text style={styles.METODO}>Metodo: {tokenData.MetodoPago}</Text>
        </View>
        <Text style={styles.FECHA}>Fecha: {tokenData.Fecha ? format(tokenData.Fecha.toDate(), 'dd/MM/yyyy') : 'Cargando fecha...'}</Text>
      </View>
      <View style={styles.aceptardenegar}>
        <IconButton name={kikiriko} onPress={() => handlereject({ id: tokid })} />
        <IconButton name={kikiriki} onPress={() => handleaccept({ id: tokid })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FECHA: {
    color: '#fff',
    fontSize: 16,
  },
  PRECIO: {
    color: '#fa0',
    fontSize: 15,
  },
  METODO: {
    color: '#fff',
    fontSize: 15,
    marginRight: 3
  },
  NOMBRE: {
    fontSize: 23,
    fontWeight: '600',
    color: '#009BDE',
  },
  infoplis: {
    flexDirection: 'row',
    marginLeft: 5
  },
  container: {
    width: '88%',
    height: 100,
    borderRadius: 15,
    backgroundColor: '#333',
    alignSelf: 'center',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  identificador: {
    width: '59%',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5,
  },
  aceptardenegar: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-evenly',
    backgroundColor: '#777',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 5
  },
});

export default REQUESTDELTOKEN;
