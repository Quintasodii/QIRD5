import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Dimensions, StyleSheet, Text } from 'react-native'

const {width: screenWidth} = Dimensions.get('screen')
const {height: screenHeight} = Dimensions.get('screen')

const CustomButton = ({onPress, botoncual}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.CBUT}>
        <Text style={styles.inBUTT}>{botoncual}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    CBUT:{
        height: screenHeight*0.055,
        width: screenWidth*0.85,
        backgroundColor: '#00B2FF',
        borderRadius: 30,
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inBUTT:{
      position: 'absolute',
      paddingHorizontal: 15,
      color: '#000',
      flex: 1,
      fontSize: 20
  }
})


export default CustomButton