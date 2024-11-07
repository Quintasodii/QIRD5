import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import REQUESTDELTOKEN from '../components/REQUESTDELTOKEN';

const Tokenrequest = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('TokenRequest')
      .orderBy('Fecha')
      .onSnapshot(
        querySnapshot => {
          const docs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(docs);
        },
        error => {
          Alert.alert('Error', error.message);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.TITULO}>
        <Text style={styles.title}>Solicitudes</Text>
      </View>
      <View style={styles.separador} />
      <ScrollView>
        {documents.length > 0 ? (
          documents.map(doc => (
            <REQUESTDELTOKEN key={doc.id} tokid={doc.id} />
          ))
        ) : (
          <Text style={styles.noClassesText}>No hay solicitudes disponibles.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  separador: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '90%',
    height: 4,
    borderRadius: 14,
  },
  title: {
    fontSize: 50,
    color: 'white',
    margin: '5%',
  },
  TITULO: {
    height: '15%',
    backgroundColor: '#0E0E0E',
    width: '100%',
    marginTop: '7%',
  },
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  noClassesText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Tokenrequest;
