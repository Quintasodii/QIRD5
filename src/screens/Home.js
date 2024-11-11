import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import myImage from '../assets/fondo_home.png';
import Creditos from '../components/Creditos';
import Close from '../assets/CLOSE.png';
import IconButton from '../components/IconButton';
import efect from '../assets/efetivo_black.png';
import trasnferblack from '../assets/tranfer_finblack.png';
import infoImage from '../assets/ACUETA.png'

export default function Home() {
  const [modalVisibilityShesh, setModalVisibilityShesh] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(4);
  const [selectedMpago, setselectedMpago] = useState('Efectivo');

  function goanashe() {
    setModalVisibilityShesh(true);
  }

  const handlerequest = async (selectedPlan, selectedMpago) => {
    try {
      const user = auth().currentUser;
      const URSER = {
        User_ID: user.uid,
        PlanToken: selectedPlan,
        Estado: 'Pendiente',
        Fecha: firestore.FieldValue.serverTimestamp(),
        MetodoPago: selectedMpago,
      };
      await firestore().collection('TokenRequest').add(URSER);
      setModalVisibilityShesh(false);
      setInfoModalVisible(true); // Abre el modal con información fija
    } catch (error) {
      console.log(error, 'Error en la solicitud');
    }
  };

  const handlePlanSelect = (plan) => setSelectedPlan(plan);

  const handleMpagoSelect = (mpago) => setselectedMpago(mpago);

  return (
    <View style={styles.padre}>
      <View style={styles.billetera}>
        <Creditos anashe={goanashe} />
      </View>
      <View style={{ height: 100 }}></View>
      <View style={styles.imagen}>
        <Image source={myImage} />
      </View>

      {/* Primer Modal */}
      <Modal transparent={true} visible={modalVisibilityShesh} animationType="fade">
        <View style={styles.ModalBack}>
          <View style={styles.ModalBlock}>
            <View style={styles.Cerrar}>
              <Text style={styles.title}>Comprar Tokens</Text>
              <IconButton name={Close} onPress={() => setModalVisibilityShesh(false)} />
            </View>
            <View style={styles.formulariotokens}>
              <Text style={styles.subtitulos}>Elegir plan: </Text>
              <View>
                <TouchableOpacity style={[styles.PlanButton, selectedPlan === 4 && styles.selectedButton]} onPress={() => handlePlanSelect(4)}>
                  <Text style={[styles.BotonTextoMF, selectedPlan === 4 && styles.selectedButtonText]}>Abonar 4 clases</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.PlanButton, selectedPlan === 8 && styles.selectedButton]} onPress={() => handlePlanSelect(8)}>
                  <Text style={[styles.BotonTextoMF, selectedPlan === 8 && styles.selectedButtonText]}>Abonar 8 clases</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.PlanButton, selectedPlan === 12 && styles.selectedButton]} onPress={() => handlePlanSelect(12)}>
                  <Text style={[styles.BotonTextoMF, selectedPlan === 12 && styles.selectedButtonText]}>Abonar 12 clases</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.subtitulos}>Elegir metodo de pago: </Text>
              <View style={styles.MPagoBox}>
                <TouchableOpacity style={[styles.MpagoBut, selectedMpago === 'Efectivo' && styles.selectedButton]} onPress={() => handleMpagoSelect('Efectivo')}>
                  <Image source={efect} style={{ alignSelf: 'center' }} />
                  <Text style={styles.BotonTextoMP}>Efectivo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.MpagoBut, selectedMpago === 'Transferencia' && styles.selectedButton]} onPress={() => handleMpagoSelect('Transferencia')}>
                  <Image source={trasnferblack} style={{ alignSelf: 'center' }} />
                  <Text style={styles.BotonTextoMP}>Transferencia</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.submit}>
                <TouchableOpacity style={styles.submitbut} onPress={() => handlerequest(selectedPlan, selectedMpago)}>
                  <Text style={styles.submittxt}>Proceder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Segundo Modal con Información Fija */}
      <Modal transparent={true} visible={infoModalVisible} animationType="fade">
        <View style={styles.ModalBack}>
          <View style={styles.infoModal}>
            <Image source={infoImage} style={styles.infoImage}/>
            <Text style={styles.infoText}>ALIAS: TRAININGPOINTMP</Text>
            <Text style={styles.infoText}>CVU:0000006574837774837</Text>
            
            <TouchableOpacity style={styles.closeInfoButton} onPress={() => setInfoModalVisible(false)}>
              <Text style={styles.infoButtonText}>Cerrar</Text>
            </TouchableOpacity>
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
    marginLeft: 30,
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
  infoModal: {
    height: '40%',
    width: '75%',
    backgroundColor: '#232323',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  infoImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '900'
  },
  closeInfoButton: {
    backgroundColor: '#009BDE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  infoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: '#009BDE',
    fontWeight: '500',
    textAlignVertical: 'center',
    fontSize: 29,
    marginRight: 50,
  },
});
