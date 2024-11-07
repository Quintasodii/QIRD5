import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const LEERMAS = ({ visibler, onClose, clases }) => {
    const [anotadoss, setAnotadoss] = useState([]);
    const [clasepuf, setclasepuf] = useState([]);

    useEffect(() => {
        const claseRef = firestore().collection('Clases').doc(clases);

        // Escucha en tiempo real para los cambios en el documento
        const unsubscribe = claseRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const datosClase = snapshot.data();
                setclasepuf(datosClase);
                setAnotadoss(datosClase.anotados || []);
            }
        });

        // Limpia la suscripción cuando el componente se desmonte
        return () => unsubscribe();
    }, [clases]);

    const actualizarEstado = async (index, estado) => {
        const updatedAnotados = anotadoss.map((anotado, i) =>
            i === index ? { ...anotado, estado } : anotado
        );
        setAnotadoss(updatedAnotados);

        const claseRef = firestore().collection('Clases').doc(clases);
        await claseRef.update({
            anotados: updatedAnotados
        });
    };

    const terminarClase = async () => {
        try {
            const claseRef = firestore().collection('Clases').doc(clases);
            const claseData = { ...clasepuf, anotados: anotadoss };

            // Añade la clase a HistoricoClases
            await firestore().collection('HistoricoClases').add(claseData);

            // Borra la clase de la colección Clases
            await claseRef.delete();

            // Cierra el modal después de terminar la clase
            onClose();
        } catch (error) {
            console.error("Error al mover la clase al histórico:", error);
        }
    };

    return (
        <Modal transparent={true} visible={visibler} animationType="slide">
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={styles.GRANTITULO}>
                        <Text style={styles.HORAFECHA}>Clase: {clasepuf.FechaHora}</Text>
                    </View>
                    <View style={styles.InfoChill}>
                        <Text style={styles.text}>Descripcion:</Text>
                        <Text style={styles.text}>{clasepuf.description}</Text>
                    </View>
                    <Text style={styles.title}>Anotados: </Text>
                    <View style={styles.Asistentes}>
                        <ScrollView style={styles.scrollView}>
                            {anotadoss.length === 0 ? (
                                <Text style={styles.noStudentsText}>No hay alumnos anotados.</Text>
                            ) : (
                                anotadoss.map((anotado, index) => (
                                    <View key={index} style={styles.anotadoContainer}>
                                        <Text style={styles.textoAlumno}>{anotado.name}</Text>
                                        <Text style={styles.textoEstado}>Estado: {anotado.estado}</Text>
                                        <View style={styles.botonesContainer}>
                                            <Button 
                                                title="Presente" 
                                                onPress={() => actualizarEstado(index, 'Presente')} 
                                                color="#4CAF50"
                                            />
                                            <Button 
                                                title="Ausente" 
                                                onPress={() => actualizarEstado(index, 'Ausente')} 
                                                color="#F44336"
                                            />
                                        </View>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity onPress={terminarClase}>
                    <Text style={styles.finishButton}>Terminar Clase</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

// Estilos permanecen igual
const styles = StyleSheet.create({
    Asistentes:{
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        height: 420
    },
    InfoChill:{
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 20,
    },
    GRANTITULO:{
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 10
    },
    HORAFECHA:{
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
        marginTop: 15
    },
    scrollView: {
        padding: 10,
        width: '100%'
    },
    anotadoContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    textoAlumno: {
        fontSize: 17,
        fontWeight: '900',
        color: '#fff'
    },
    textoEstado: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700'
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        height: 600,
        backgroundColor: '#111',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 0,
        fontWeight: '900',
        color: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 20,
        alignSelf: 'flex-start',
        color: '#fff'
    },
    noStudentsText: {
        fontSize: 16,
        color: '#009BDE',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        color: '#009BDE',
        fontSize: 16,
    },
    finishButton: {
        textAlign: 'center',
        width: 260,
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 15,
        marginTop: 20
    }
});

export default LEERMAS;
