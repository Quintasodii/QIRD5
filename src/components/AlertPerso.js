import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CustomAlert = ({ message, onDismiss, type }) => {
  return (
    <View style={[styles.alertContainer, type === 'error' ? styles.error : styles.success]}>
      <Text style={styles.alertText}>{message}</Text>
      <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
        <Text style={styles.dismissText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 50,
    left: '5%',
    right: '5%',
    padding: 20,
    borderRadius: 15,
    zIndex: 1000,
  },
  alertText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
  },
  dismissButton: {
    backgroundColor: '#00B2FF',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dismissText: {
    color: '#000',
    fontWeight: 'bold',
  },
  success: {
    backgroundColor: '#4CAF50', // Verde para éxito
  },
  error: {
    backgroundColor: '#F44336', // Rojo para error
  },
});

export default CustomAlert;
