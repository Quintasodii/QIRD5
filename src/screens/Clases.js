import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ClaseAsset from '../components/ClaseAsset';
import { subHours } from 'date-fns'; // Para ajustar la hora si es necesario

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

const Clases = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Clases')
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
                            timestamp={doc.FechaHora} 
                        />
                    ))
                ) : (
                    <Text style={styles.noClassesText}>No hay clases disponibles.</Text>
                )}
            </ScrollView>
            <View style={{ height: screenHeight * 0.1 }}></View>
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
        height: screenHeight,
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
