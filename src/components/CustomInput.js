import React from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'

const {width: screenWidth} = Dimensions.get('screen');
const {height: screenHeight} = Dimensions.get('screen');

const CustomInput = ({placeholder, value, onChangeText, secureTextEntry}) => {
  return (
    <View style={styles.cajatexto}>
        <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#00B2FF'}
        secureTextEntry={secureTextEntry}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    cajatexto:{
        paddingVertical: 20,
        backgroundColor: '#4d4d4d',
        borderRadius: 15,
        marginVertical: 10,
        width: screenWidth*0.85,
        height: screenHeight*0.055,
        opacity: 0.5
    },
    input:{
        position: 'absolute',
        paddingHorizontal: 15,
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})


export default CustomInput