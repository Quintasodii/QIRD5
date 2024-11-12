import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = auth().currentUser.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Notifications')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const notificationsData = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (!data.readBy || !Array.isArray(data.readBy)) {
            data.readBy = [];
          }
          if (!data.readBy.includes(userId)) {
            notificationsData.push({ ...data, id: doc.id });
          }
        });
        setNotifications(notificationsData);
      });

    return () => unsubscribe();
  }, [userId]);

  const markAsRead = async (id) => {
    try {
      await firestore()
        .collection('Notifications')
        .doc(id)
        .update({ readBy: firestore.FieldValue.arrayUnion(userId) });
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <TouchableOpacity onPress={() => markAsRead(item.id)} style={styles.markAsReadButton}>
        <Text style={styles.markAsReadText}>Marcar como Leída</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textotitulo}>Notificaciones</Text>
        <View style={styles.separador} />
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    height: '15%',
    backgroundColor: '#0E0E0E',
    width: '100%',
    marginTop: '10%',
  },
  notificationContainer: {
    backgroundColor: '#212121',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009BDE',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  markAsReadButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#009BDE',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  markAsReadText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  textotitulo:{
    fontSize: 40,
    color: 'white',
    margin: '5%',
    textAlign: 'left'
    },
    separador:{
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '97%',
        height: 4,
        borderRadius: 14,
    }
});

export default NotificationsScreen;
