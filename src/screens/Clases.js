import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ClaseAsset from '../components/ClaseAsset';
import addd from '../assets/add_circle_black.png';
import anotadoIcon from '../assets/choquecheck.png';

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

const Clases = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nombrer, setnombrer] = useState('')
    const currentUser = auth().currentUser;
    useEffect(() => {
        let unsubscribe;
        
        const fetchData = async () => {
            if (currentUser) {
                try {
                    const userDoc = await firestore().collection('Users').doc(currentUser.uid).get();
                    const userData = userDoc.data();
                    setnombrer(userData.nombreCompleto)
                    if (userData?.gender) {
                        unsubscribe = firestore()
                            .collection('Clases')
                            .where('gender', '==', userData.gender)
                            .orderBy('FechaHora')
                            .onSnapshot(
                                (snapshot) => {
                                    const clases = snapshot.docs.map(doc => ({
                                        id: doc.id,
                                        ...doc.data(),
                                    }));
                                    setDocuments(clases);
                                    setLoading(false);
                                },
                                (error) => {
                                    console.error("Error al escuchar cambios:", error);
                                    setError("Error obteniendo los datos. Por favor, intenta más tarde.");
                                    setLoading(false);
                                }
                            );
                    } else {
                        console.log("No se encontró el género del usuario.");
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error obteniendo datos:", error);
                    setError("Error obteniendo los datos. Por favor, intenta más tarde.");
                    setLoading(false);
                }
            } else {
                console.log("No hay un usuario autenticado");
                setLoading(false);
            }
        };
        fetchData();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (error) {
        Alert.alert('Error', error);
        return null;
    }

    const AnotarseAClase = async (doc) => {
        try {
            const userRef = firestore().collection('Users').doc(currentUser.uid);
            const userSnapshot = await userRef.get();
            const userCredits = userSnapshot.data()?.Creditos;

            if (userCredits > 0) {
                await userRef.update({
                    Creditos: userCredits - 1
                });
                
                const claseRef = firestore().collection('Clases').doc(doc.id);
                await claseRef.update({
                    anotados: firestore.FieldValue.arrayUnion({ name: nombrer, userid: currentUser.uid, estado: 'NO TOMADO' })
                });
            } else {
                Alert.alert("Error", "No tienes créditos suficientes para anotarte en esta clase.");
            }
        } catch (error) {
            console.error("Error al anotarse a la clase:", error);
            Alert.alert("Error", "Ocurrió un error al intentar anotarse a la clase. Inténtalo nuevamente.");
        }
    };

    const isUserAnotado = (anotados) => {
        return anotados?.some(anotado => anotado.userid === currentUser.uid);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Clases</Text>
                <View style={styles.separator} />
            </View>
            <ScrollView>
                {documents.length > 0 ? (
                    documents.map(doc => {
                        const anotado = isUserAnotado(doc.anotados);
                        return (
                            <ClaseAsset
                                key={doc.id}
                                dateString={doc.FechaHora}
                                ICONOELEGIR={anotado ? anotadoIcon : addd}
                                FUNCIONALIDAD={() => !anotado && AnotarseAClase(doc)}
                                anotado={anotado}
                            />
                        );
                    })
                ) : (
                    <Text style={styles.noClassesText}>No hay clases disponibles.</Text>
                )}
            </ScrollView>
            <View style={{ height: screenHeight * 0.1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: screenWidth * 0.9,
        height: 4,
        borderRadius: 14,
    },
    container: {
        flex: 1,
        backgroundColor: '#0E0E0E',
        width: screenWidth,
        alignItems: 'center',
    },
    titleContainer: {
        height: '15%',
        backgroundColor: '#0E0E0E',
        width: '100%',
        marginTop: '10%',
    },
    title: {
        fontSize: 50,
        color: 'white',
        margin: '5%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noClassesText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Clases;
