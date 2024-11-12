import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddNotif = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const uploadNotification = async () => {
    if (!title || !message) return;

    try {
      await firestore().collection('Notifications').add({
        title,
        message,
        timestamp: firestore.FieldValue.serverTimestamp(),
        read: false,
      });
      setTitle('');
      setMessage('');
      alert('Notificación subida correctamente');
    } catch (error) {
      console.error('Error al subir notificación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Notificación</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#009BDE"
      />
      <TextInput
        placeholder="Mensaje"
        value={message}
        onChangeText={setMessage}
        multiline
        style={styles.input}
        placeholderTextColor="#009BDE"
      />
      <View style={{marginTop: 40}}>
      <TouchableOpacity style={styles.button} onPress={uploadNotification}>
        <Text style={styles.buttonText}>Subir</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#212121',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#009BDE',
    paddingVertical: 12,
    borderRadius: 29,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 19,
  },
});

export default AddNotif;
