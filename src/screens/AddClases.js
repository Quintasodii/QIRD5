import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import IconButton from '../components/IconButton';
import agregar from '../assets/add_circle.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ClaseAsset from '../components/ClaseAsset';
import borrar from '../assets/DELETE.png';
import CustomInput from '../components/CustomInput';
import Close from '../assets/CLOSE.png';
import { format } from 'date-fns';
import CustomModal from '../components/CustomDateHourPicker';
import LEERMAS from '../components/LEERMAS';

const AddClases = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalvisible, setmodalvisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [mordalvisible, setmordalvisible] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState('00/00/0000 00:00');
    const [selectedGender, setSelectedGender] = useState('Masculino');
    const [description, setdescription] = useState('');

    const [selectedClass, setSelectedClass] = useState(null);

    const openClassDetails = (clase) => {
      setSelectedClass(clase);
      setmordalvisible(true);
    };


    const openModal = () => setModalVisible2(true);
    const closeModal = () => setModalVisible2(false);
    const LEEREMAS = () => setmordalvisible(true);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleSubirClase = (description, selectedGender, selectedDateTime) => {
        try {
            firestore()
                .collection('Clases')
                .add({
                    FechaHora: selectedDateTime,
                    description: description,
                    gender: selectedGender,
                    anotados: []
                });
            setmodalvisible(false);
        } catch (error) {
            console.log(error, 'Error al subir la clase');
        }
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Clases')
            .orderBy('FechaHora')
            .onSnapshot(querySnapshot => {
                const docs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDocuments(docs);
                setLoading(false);
            }, error => {
                Alert.alert('Error', error.message);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    const handleConfirm = (date, hour) => {
        const formattedDate = format(date, 'yyyy/MM/dd');
        setSelectedDateTime(`${formattedDate} ${hour}`);
    };

    const BORRARCLASES = (doc) => {
        firestore()
            .collection('Clases')
            .doc(doc.id)
            .delete();
    };

    return (
        <View style={styles.ContenedorPrimal}>
            <View style={styles.header}>
                <Text style={styles.textotitulo}>Agregar Clase</Text>
                <IconButton name={agregar} style={styles.AllClases} onPress={() => setmodalvisible(true)} />
            </View>
            <View style={styles.separador} />
            <ScrollView style={{ marginTop: 30 }}>
                {documents.length > 0 ? (
                    documents.map(doc => (
                        <ClaseAsset
                            key={doc.id}
                            dateString={doc.FechaHora}
                            ICONOELEGIR={borrar}
                            FUNCIONALIDAD={() => BORRARCLASES(doc)}
                            terreque={() => openClassDetails(doc.id)}
                        />
                    ))
                ) : (
                    <Text style={styles.noClassesText}>No hay clases disponibles.</Text>
                )}
            </ScrollView>
            <Modal transparent={true} animationType='fade' visible={modalvisible} onRequestClose={() => setmodalvisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <View style={styles.Cerrar}>
                            <Text style={{ color: '#009BDE', textAlign: 'left', fontSize: 30, marginRight: 97 }}>Agregar Clase</Text>
                            <IconButton name={Close} onPress={() => setmodalvisible(false)} />
                        </View>
                        <View style={styles.FormModal}>
                            <Text style={{ textAlign: 'left', color: '#fff', fontSize: 20, marginBottom: 25, marginTop: 30 }}>Fecha y Hora :</Text>
                            <TouchableOpacity onPress={openModal}><Text style={styles.fonttextji}>{selectedDateTime}</Text></TouchableOpacity>
                            <Text style={{ textAlign: 'left', color: '#fff', fontSize: 20, marginBottom: 25, marginTop: 30 }}>Genero :</Text>
                            <View style={styles.selectorgenero}>
                                <TouchableOpacity style={[styles.genderButton, selectedGender === 'Masculino' && styles.selectedButton]} onPress={() => handleGenderSelect('Masculino')}>
                                    <Text style={[styles.BotonTextoMF, selectedGender === 'Masculino' && styles.selectedButtonText]}>Masculino</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.genderButton, selectedGender === 'Femenino' && styles.selectedButton]} onPress={() => handleGenderSelect('Femenino')}>
                                    <Text style={[styles.BotonTextoMF, selectedGender === 'Femenino' && styles.selectedButtonText]}>Femenino</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ textAlign: 'left', color: '#fff', fontSize: 20, marginBottom: 25, marginTop: 30 }}>Descripcion :</Text>
                            <CustomInput placeholder='Ingrese la descripcion de la clase' style={styles.description} multiline={true} onChangeText={setdescription} />
                            <TouchableOpacity style={styles.subirclase} onPress={() => handleSubirClase(description, selectedGender, selectedDateTime)}><Text style={styles.subirclase2}>Subir Clase</Text></TouchableOpacity>
                            <CustomModal visible={modalVisible2} onClose={closeModal} onConfirm={handleConfirm} />
                        </View>
                    </View>
                </View>
            </Modal>
            <LEERMAS visibler={mordalvisible} onClose={() => setmordalvisible(false)} clases={selectedClass}/>
        </View>
    );
};

const styles = StyleSheet.create({
  Confirmarback2:{
    width: 500,
    height: 600,
    backgroundColor: '#fff'
  },
  Confirmarback:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  ContenedorPrimal:{
      justifyContent: 'center',
      backgroundColor: '#000',
      width: '100%',
      height: '100%',
      alignItems: 'center'
  },
  AllClases:{
      marginTop: 7,
      marginLeft: 50
  },
  header:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 100
  },
  textotitulo:{
      textAlignVertical: 'center',
      fontSize: 40,
      fontWeight: '600',
      color: '#fff'
  },
  separador:{
      width: '85%',
      height: 4,
      backgroundColor: '#fff',
      borderRadius: 20,
      alignSelf: 'center',
      marginTop: 15
  },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent:{
      height: '80%',
      width: '90%',
      backgroundColor: '#212121',
      borderRadius: 29,
      alignItems: 'center'
    },
    Cerrar:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20
    },
    FormModal:{
      alignItems: 'center',
      marginTop: 30,
      width: 300,
      height: 400
    },
    fonttextji:{
      color: '#fff',
      fontSize: 21,
      fontWeight: '700',
      backgroundColor: '#656565',
      paddingHorizontal: 50,
      paddingVertical: 3,
      borderRadius: 10
    },
    selectorgenero:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    genderButton:{
      flex: 1,
      padding: 15,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: '#151515', 
      alignItems: 'center',
      justifyContent: 'center'
  },
    selectedButton: {
      backgroundColor: '#009BDE',
    },
    BotonTextoMF:{
      fontSize: 19,
      color: '#fff',
      fontWeight: '600'
    },
    selectedButtonText:{
      color: '#000',
    },
    description:{
      backgroundColor: '#4d4d4d',
      borderRadius: 10,
      width: '100%',
      height: '35%',
      opacity: 0.5,
    },
    subirclase:{
      width: '100%',
      height: 40,
      backgroundColor: '#009BDE',
      justifyContent: 'center',
      borderRadius: 15,
      marginTop: 30
    },
    subirclase2:{
      textAlign: 'center',
      color: '#000',
      fontSize: 25,
      fontWeight: '700'
    }
});

export default AddClases;
