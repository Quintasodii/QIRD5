import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import myImage from '../assets/fondo_home.png';
import Creditos from '../components/Creditos';
import Close from '../assets/CLOSE.png'
import IconButton from '../components/IconButton';
import efect from '../assets/efetivo_black.png';
import trasnferblack from '../assets/tranfer_finblack.png'

export default function Home() {
  const [ModalVisibilityShesh,setModalVisibilityShesh] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(4)
  const [selectedMpago, setselectedMpago] = useState('Efectivo')

  function goanashe  ()  {
    try{
      setModalVisibilityShesh(true);
    }catch (error){
      console.log(error, 'NONONONO')
    }
  }

  const handlerequest = async (selectedPlan, selectedMpago) => {
    try{
      const userre = auth().currentUser
      const URSER = {
        User_ID:  userre.uid,
        PlanToken: selectedPlan ,
        Estado : 'Pendiente' ,
        Fecha: firestore.FieldValue.serverTimestamp(),
        MetodoPago: selectedMpago
      }
      await firestore().collection('TokenRequest').add(URSER)
      setModalVisibilityShesh(false)
    }catch (error){
      console.log(error, 'No anda gordo')
    }
  }

  const handlePlanSelect = (arcanashe) => {
    setSelectedPlan(arcanashe);
  };

  const handleMpagoSelect = (papanashe) => {
    setselectedMpago(papanashe);
  };

  return (
    <View style={styles.padre}>
      
      <View style={styles.billetera}>
      <Creditos anashe={goanashe}/>
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

                <TouchableOpacity style={[styles.PlanButton, selectedPlan === 4 && styles.selectedButton]} onPress={()=> handlePlanSelect(4)}>
                  <Text style={[styles.BotonTextoMF , selectedPlan === 4 && styles.selectedButtonText]}>Abonar 4 clases...............................</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.PlanButton, selectedPlan=== 8 && styles.selectedButton]} onPress={()=> handlePlanSelect(8)}>
                 <Text style={[styles.BotonTextoMF , selectedPlan === 8 && styles.selectedButtonText]}>Abonar 8 clases................................</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.PlanButton, selectedPlan=== 12 && styles.selectedButton]} onPress={()=> handlePlanSelect(12)}>
                 <Text style={[styles.BotonTextoMF , selectedPlan === 12 && styles.selectedButtonText]}>Abonar 12 clases..............................</Text>
                </TouchableOpacity>
                
                </View>
                <Text style={styles.subtitulos}>Elegir metodo de pago: </Text>
                <View style={styles.MPagoBox}>
                <TouchableOpacity style={[styles.MpagoBut, selectedMpago === 'Efectivo' && styles.selectedButton]} onPress={()=> handleMpagoSelect('Efectivo')}>
                  <Image source={efect} style={{alignSelf: 'center'}}/><Text style={styles.BotonTextoMP}>Efectivo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.MpagoBut, selectedMpago === 'Transferencia' && styles.selectedButton]} onPress={()=>handleMpagoSelect('Transferencia')}>
                  <Image source={trasnferblack} style={{alignSelf: 'center'}}/><Text style={styles.BotonTextoMP}>Transferencia</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.submit}>
                  <TouchableOpacity style={styles.submitbut} onPress={()=>handlerequest(selectedPlan, selectedMpago)}>
                    <Text style={styles.submittxt}>Proceder</Text>
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
  submit:{
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitbut:{
    width: '85%',
    height: 40, 
    backgroundColor: '#009BDE',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center'
  },
  submittxt:{
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
    color: '#000',
  },
  BotonTextoMP:{
    fontSize: 14,
    color: '#fff',
    fontWeight: '300',
    textAlign: 'center',
  },
  MPagoBox:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  MpagoBut:{
    justifyContent: 'center',
    width: 120,
    height: 125,
    borderRadius: 10,
    borderColor: '#303030',
    borderWidth: 1,
    backgroundColor: '#303030'
  },
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
    justifyContent: 'center',
    marginTop: 34
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