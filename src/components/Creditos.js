import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IconButton from './IconButton';

const {width:screenWidth}= Dimensions.get('screen');
const {height:screenHeight}= Dimensions.get('screen');

tokens = 0

const Creditos=()=> {
    const navigation = useNavigation();
  return (
    <View style={styles.Box}>
        <Text style={styles.inbox}>Creditos:   {tokens}</Text>
        <Pressable>
            <IconButton color='#009BDE'/>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    Box: {
      backgroundColor: "#1e1d1d",
      width: screenWidth*0.92,  
      height: screenHeight*0.082,   
      padding: 10, 
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between', 
      borderRadius: 15
    },
    inbox: {
      fontSize: 20,
      color: '#fff',
    },
  });


export default Creditos;