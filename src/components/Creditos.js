import React, { useState, useEffect } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from './IconButton';
import add_circle from '../assets/add_circle.png'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const {width:screenWidth}= Dimensions.get('screen');
const {height:screenHeight}= Dimensions.get('screen');

const Creditos=({anashe})=> {
  const [creditos, setCreditos] = useState()
  const currentuser = auth().currentUser

  useEffect(() => {
    const fetchUserCreditos = async () => {
      try {
        const userSnapshot = await firestore().collection('Users').doc(currentuser.uid).get();
        if (userSnapshot.exists) {
          setCreditos(userSnapshot.data().creditos);
        } else {
          console.log('El usuario no existe en la colección Users');
        }
      } catch (error) {
        console.error("Error al obtener créditos:", error);
      }
    };

    fetchUserCreditos();
  }, [currentuser.uid]);

  
  return (
    <View style={styles.Box}>
      <Text style={styles.inbox}>Creditos:  {creditos}</Text>
      <View style={{marginRight: 10}}>
      <IconButton name={add_circle} onPress={anashe}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Box: {
      backgroundColor: "#1e1d1d",
      width: screenWidth*0.92,  
      height: screenHeight*0.082,   
      padding: 20, 
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between', 
      borderRadius: 15,

    },
    inbox: {
      fontSize: 20,
      color: '#fff',
    },
  });


export default Creditos;