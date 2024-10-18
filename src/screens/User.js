import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import IconButton from '../components/IconButton';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import logoyo from '../assets/add_circle.png'


export default function User () {
    const [uid, setUid] = useState(null);
    const [userData, setUserData] = useState(null);
    
    useEffect(()=> {
        const currentUser = auth().currentUser
        if(currentUser){
            const uid = currentUser.uid
            setUid(uid);

            firestore()
            .collection('Users')
            .doc(uid)
            .get()
            .then(documentSnapshot => {
                if(documentSnapshot.exists){
                    setUserData(documentSnapshot.data())
                }else{
                    console.log('No se encontro el usuario asociado al uid');
                }
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            console.log('no existe tal usuario entre nos')
        }    
    }, []);
    
    const handleLogout = () => {
        auth()
          .signOut()
          .then(() => {
            console.log('User signed out!');
            props.navigation.replace('Login'); 
          })
          .catch(error => {
            console.log(error);
            return null
          });
      };

        return(
            <View style={styles.padre} >
                <View style={styles.container} >
                    <Text style={{color:'#fff'}}>
                        {userData.nombreCompleto}
                    </Text>
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