import React from 'react'
import {  Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconButton from './IconButton'
import add_circle_black from '../assets/add_circle_black.png'
import { format, subHours } from 'date-fns'
import { es } from 'date-fns/locale'

const {width : screenWidth} = Dimensions.get('screen')
const {height: screenHeight} = Dimensions.get('screen')


const ClaseAsset = ({timestamp, description}) => {
    
    const eventDate = timestamp.toDate();

    const eventDatePosta = subHours(eventDate, 3);

    const dia = format(eventDatePosta, 'd'); 
    const diaDeLaSemana = format(eventDatePosta, 'eee', { locale: es }); 
    const horaInicio = format(eventDatePosta, 'HH:mm', { locale: es }); 
    const horaFin = format(eventDatePosta.setHours(eventDatePosta.getHours() + 1), 'HH:mm', { locale: es });
    
  return (
    <View style={styles.Todo}>
        <View style={styles.diadiasandia}>
          <View><Text style={styles.nochenochefantoche}>{dia}</Text></View> 
          <View><Text style={styles.capitandelespacio}>{diaDeLaSemana}</Text></View>
        </View>
        <View style={{alignContent:'center', alignItems: 'center'}}>
          <View style={styles.aquellanochelocadelosmiltequilas}><Text style={styles.maramarombai}>{horaInicio} a {horaFin}</Text></View>
          <View><TouchableOpacity><Text style={styles.leermas}>Leer Mas</Text></TouchableOpacity></View>
        </View>
        <View style={styles.parapra}>
            <IconButton name={add_circle_black} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Todo:{
        backgroundColor: '#009BDE',
        width: screenWidth*0.87,
        height: screenHeight*0.1,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    diadiasandia:{
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nochenochefantoche:{
      fontSize: 52,
      color: '#000',
      fontWeight: '500'
    },
    capitandelespacio:{
      fontSize: 26,
      color: '#000',
      marginBottom: 10,
      marginTop: -15,
      fontWeight: '900'

    },
    aquellanochelocadelosmiltequilas:{
      backgroundColor: '#ccc',
      borderRadius: 20,
      width: screenWidth*0.46,
      marginTop: 20,
      marginBottom: 15,

    },
    maramarombai:{
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
      fontWeight: '900'
    },
    leermas:{
      color: '959595',
      fontWeight:'800'
    },
    parapra:{
      justifyContent: 'center',
      marginRight: 15
    }
})

export default ClaseAsset