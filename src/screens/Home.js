import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import myImage from '../assets/fondo_home.png';
import Creditos from '../components/Creditos';
import Close from '../assets/CLOSE.png'
import IconButton from '../components/IconButton';

export default function Home() {
  const [ModalVisibilityShesh,setModalVisibilityShesh] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('4kon')

  function goanashe  ()  {
    try{
      setModalVisibilityShesh(true);
    }catch (error){
      console.log(error, 'NONONONO')
    }
  }

  const handlePlanSelect = (arcanashe) => {
    console.log(arcanashe)
    setSelectedPlan(arcanashe);
  };

  return (
    <View style={styles.padre}>
      
      <View style={styles.billetera}>
      <Creditos anashe={goanashe}/>
      </View>
      <View style={styles.wod}>
        <Text style={styles.wodtext}>Trabajo del día:</Text>
      </View>
      <View style={styles.wod}>
        <Text style={styles.wodtext}>Próxima clase:</Text>
      </View>
      <View style={styles.imagen}>
        <Image source={myImage} />
      </View>
      <Modal
      transparent={true}
      visible={ModalVisibilityShesh}
      animationType='fade'
      >
        <View style={styles.ModalBack}>
          <View style={styles.ModalBlock}>
            <View style={styles.Cerrar}>
              <Text style={{color: '#009BDE', fontWeight: '500', textAlignVertical: 'center', fontSize: 29, marginRight: 50}}>Comprar Tokens</Text>
              <IconButton name={Close} onPress={()=> setModalVisibilityShesh(false)}/>
            </View>
            <View style={styles.formulariotokens}>
              <View style={styles.Planes}>
                <Text style={styles.subtitulos}>Elegir plan: </Text>
              <View>

                <TouchableOpacity style={[styles.PlanButton, selectedPlan === '4kon' && styles.selectedButton]} onPress={()=> handlePlanSelect('4kon')}>
                  <Text style={[styles.BotonTextoMF , selectedPlan === '4kon' && styles.selectedButtonText]}>Abonar 4 clases...............................</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.PlanButton, selectedPlan=== '8kon' && styles.selectedButton]} onPress={()=> handlePlanSelect('8kon')}>
                 <Text style={[styles.BotonTextoMF , selectedPlan === '8kon' && styles.selectedButtonText]}>Abonar 8 clases................................</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.PlanButton, selectedPlan=== '12kon' && styles.selectedButton]} onPress={()=> handlePlanSelect('12kon')}>
                 <Text style={[styles.BotonTextoMF , selectedPlan === '12kon' && styles.selectedButtonText]}>Abonar 12 clases..............................</Text>
                </TouchableOpacity>
                
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: '#009BDE',
  },
  selectedButtonText:{
    color: '#000',
  },
  BotonTextoMF:{
    marginLeft: 15,
    fontSize: 18,
    color: '#fff',
    fontWeight: '500'
  },
  PlanButton:{
    marginVertical: 5,
    flex: 0,
    marginHorizontal: 10,
    borderRadius: 20
},
  subtitulos:{
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: 25,
    marginTop: 30,
    marginLeft: 15,
    fontWeight: '100'
  },
  formulariotokens:{
    justifyContent: 'center'
  },
  Cerrar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 17
  },
  ModalBlock:{
    height: '72%',
    width: '85%',
    backgroundColor: '#212121',
    borderRadius: 29,
  },
  ModalBack:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  padre: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    justifyContent: 'top',
    alignItems: 'center',
  },
  imagen: {
    width: '50%',
    height: '20%',
    marginTop: '15%',
    alignItems: 'center',
  },
  billetera: {
    marginTop: '25%',
  },
  creditos: {
    color: 'white',
    paddingTop: '5%',
    fontSize: 24,
    paddingLeft: '10%',
    fontWeight: 'semibold',
  },
  wod: {
    width: '90%',
    height: '10%',
    backgroundColor: '#333333',
    marginTop: '10%',
    borderRadius: 15,
  },
  wodtext: {
    color: '#cccccc',
    paddingTop: '4%',
    fontSize: 16,
    paddingLeft: '10%',
    fontWeight: 'semibold',
  },
});