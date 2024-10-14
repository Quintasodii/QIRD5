import React from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import ClasesAnotacion from '../components/ClaseAsset';

const {width : screenWidth} = Dimensions.get('screen')
const {height : screenHeight} = Dimensions.get('screen')

const Clases = () => {
  return (
    <View style={styles.container}>
        <View style={styles.titlecont}>
            <Text style={styles.title}>Clases</Text>
            <View style={styles.separador}/>
        </View>
        <ScrollView>
            <ClasesAnotacion />
            <ClasesAnotacion />
        </ScrollView>
        <View style={{height: screenHeight*0.1}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    separador:{
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: screenWidth*0.9,
        height: 4,
        borderRadius: 14
    },
    container:{
        height: screenHeight,
        backgroundColor: '#0E0E0E',
        width: screenWidth,
        alignItems: 'center'
    },
    titlecont:{
        height: '15%',
        backgroundColor: '#0E0E0E',
        width: '100%',
        marginTop: '10%'
    },
    title:{
        fontSize: 50,
        color: 'white',
        margin: '5%',
    }
});

export default Clases;
