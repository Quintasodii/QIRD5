import React, {useState} from 'react'
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import IconButton from '../components/IconButton';
import auth from '@react-native-firebase/auth'

import logoyo from '../assets/add_circle.png'


const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        props.navigation.replace('Login'); 
      })
      .catch(error => {
        console.log(error);
      });
  };
export default function User () {
        return(
            <View style={styles.padre} >
                <View style={styles.container} >
                    <Text style={styles.title} > Usuario </Text>
                    <IconButton name={logoyo} onPress={handleLogout}/>
                </View>
            </View>
        );
}

const styles = StyleSheet.create ({
    padre:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        backgroundColor: '#0E0E0E'
    },
    container:{
        height: '15%',
        backgroundColor: '#0E0E0E',
        width: '100%',
        marginTop: '20%'
    },
    title:{
        fontSize: 50,
        color: 'white',
        margin: '5%',
    },
});