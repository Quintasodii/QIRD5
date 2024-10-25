import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, addDays, subDays, addMinutes, subMinutes } from 'date-fns'; // Usaremos date-fns para manipular fechas y horas

const CustomModal = ({ visible, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date(10000000000000-1000000));

  // Manejar cambios en la fecha (botón arriba/abajo)
  const handleIncreaseDate = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1)); // Añadir un día
  };

  const handleDecreaseDate = () => {
    setSelectedDate(prevDate => subDays(prevDate, 1)); // Restar un día
  };

  // Manejar cambios en la hora (botón arriba/abajo)
  const handleIncreaseHour = () => {
    setSelectedHour(prevHour => addMinutes(prevHour, 15)); // Añadir 15 minutos
  };

  const handleDecreaseHour = () => {
    setSelectedHour(prevHour => subMinutes(prevHour, 15)); // Restar 15 minutos
  };

  const handleConfirm = () => {
    onConfirm(selectedDate, format(selectedHour, 'HH:mm'));
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona Fecha y Hora</Text>

          {/* Selector de Fecha */}
          <Text style={styles.label}>Fecha:</Text>
          <View style={styles.selectorContainer}>
            <TouchableOpacity onPress={handleDecreaseDate} style={styles.arrowButton}>
              <Text style={styles.arrowText}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.selectedText}>{format(selectedDate, 'dd/MM/yyyy')}</Text>
            <TouchableOpacity onPress={handleIncreaseDate} style={styles.arrowButton}>
              <Text style={styles.arrowText}>▲</Text>
            </TouchableOpacity>
          </View>

          {/* Selector de Hora */}
          <Text style={styles.label}>Hora:</Text>
          <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={handleDecreaseHour} style={styles.arrowButton}>
              <Text style={styles.arrowText}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.selectedText}>{format(selectedHour, 'HH:mm')}</Text>
            <TouchableOpacity onPress={handleIncreaseHour} style={styles.arrowButton}>
              <Text style={styles.arrowText}>▲</Text>
            </TouchableOpacity>
          </View>

          {/* Botones de acción */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff'
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff'
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#202020'
  },
  selectedText: {
    fontSize: 23,
    marginHorizontal: 20,
    color: '#fff'
  },
  confirmButton: {
    backgroundColor: '#009BDE',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 19,
    fontWeight: '900'
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'red',
    fontSize: 19,
  },
});

export default CustomModal;
