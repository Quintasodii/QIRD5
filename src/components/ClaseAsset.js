import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const {width : screenWidth} = Dimensions.get('screen')
const {height: screenHeight} = Dimensions.get('screen')


const ClaseAsset = ({timestamp, description}) => {
    /*
    const eventDate = timestamp.toDate();

    const dia = format(eventDate, 'd'); 
    const diaDeLaSemana = format(eventDate, 'EEE'); 
    const horaInicio = format(eventDate, 'HH:mm'); 
    const horaFin = format(eventDate.setHours(eventDate.getHours() + 1), 'HH:mm');
    */
  return (
    <View style={styles.Todo}>
        <Text>HOLA MUNDO</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Todo:{
        backgroundColor: '#009BDE',
        width: screenWidth*0.87,
        height: screenHeight*0.123,
        borderRadius: 20,
        marginBottom: 20

    }
})

export default ClaseAsset