import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ClaseAsset from '../components/ClaseAsset';
import addd from '../assets/add_circle_black.png';

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

const Clases = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uiddelloco = auth().currentUser;
    
                if (uiddelloco) {
                    const userDoc = await firestore().collection('Users').doc(uiddelloco.uid).get();
                    const todalainfodelloco = userDoc.data();
                    
                    if (todalainfodelloco?.gender) {
                        console.log(todalainfodelloco.gender);
                        
                        const clasesSnapshot = await firestore()
                            .collection('Clases')
                            .where('gender', '==', todalainfodelloco.gender)
                            .get();
                        
                        const clasesdeseadas = clasesSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        
                        setDocuments(clasesdeseadas);
                    } else {
                        console.log("No se encontró el género del usuario.");
                    }
                } else {
                    console.log("No hay un usuario autenticado");
                }
            } catch (error) {
                console.error("Error obteniendo datos:", error);
                setError("Error obteniendo los datos. Por favor, intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
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
        return null; // Retorna null para evitar renderizar el resto si hay error
    }

    return (
        <View style={styles.container}>
            <View style={styles.titlecont}>
                <Text style={styles.title}>Clases</Text>
                <View style={styles.separador} />
            </View>
            <ScrollView>
                {documents.length > 0 ? (
                    documents.map(doc => (
                        <ClaseAsset
                            key={doc.id}
                            dateString={doc.FechaHora}
                            ICONOELEGIR={addd}
                        />
                    ))
                ) : (
                    <Text style={styles.noClassesText}>No hay clases disponibles.</Text>
                )}
            </ScrollView>
            <View style={{ height: screenHeight * 0.1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    separador: {
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
    titlecont: {
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
