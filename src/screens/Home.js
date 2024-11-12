import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import myImage from '../assets/fondo_home.png';
import Creditos from '../components/Creditos';
import Close from '../assets/CLOSE.png';
import IconButton from '../components/IconButton';
import efect from '../assets/efetivo_black.png';
import trasnferblack from '../assets/tranfer_finblack.png';
import infoImage from '../assets/ACUETA.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      setInfoModalVisible(true);
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
      <View style={styles.spacer}></View>
      <View style={styles.imagen}>
        <Image source={myImage} style={styles.mainImage} />
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
                  <Image source={efect} style={styles.iconImage} />
                  <Text style={styles.BotonTextoMP}>Efectivo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.MpagoBut, selectedMpago === 'Transferencia' && styles.selectedButton]} onPress={() => handleMpagoSelect('Transferencia')}>
                  <Image source={trasnferblack} style={styles.iconImage} />
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
            <Image source={infoImage} style={styles.infoImage} />
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
  title:{
    fontSize: wp('7%'),
    color: '#fff'
  },
  submit: {
    marginTop: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitbut: {
    width: wp('75%'),
    height: hp('6%'),
    backgroundColor: '#009BDE',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center'
  },
  submittxt: {
    fontSize: wp('4.5%'),
    textAlign: 'center',
    fontWeight: '900',
    color: '#000',
  },
  BotonTextoMP: {
    fontSize: wp('3.5%'),
    color: '#fff',
    fontWeight: '300',
    textAlign: 'center',
  },
  MPagoBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  MpagoBut: {
    justifyContent: 'center',
    width: wp('28%'),
    height: hp('15%'),
    borderRadius: 10,
    borderColor: '#303030',
    borderWidth: 1,
    backgroundColor: '#303030'
  },
  selectedButton: {
    backgroundColor: '#009BDE',
  },
  selectedButtonText: {
    color: '#000',
  },
  BotonTextoMF: {
    marginLeft: wp('3.5%'),
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: '500'
  },
  PlanButton: {
    marginVertical: hp('0.5%'),
    flex: 0,
    marginHorizontal: wp('2.5%'),
    borderRadius: 20
  },
  subtitulos: {
    textAlign: 'left',
    color: '#fff',
    fontSize: wp('5%'),
    alignSelf: 'flex-start',
    marginBottom: hp('2.5%'),
    marginTop: hp('3%'),
    marginLeft: wp('3.5%'),
    fontWeight: '100'
  },
  formulariotokens: {
    justifyContent: 'center',
    marginTop: hp('3%')
  },
  Cerrar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginHorizontal: wp('3.5%')
  },
  ModalBlock: {
    height: hp('72%'),
    width: wp('85%'),
    backgroundColor: '#212121',
    borderRadius: 29,
  },
  ModalBack: {
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
    width: wp('50%'),
    height: hp('20%'),
    marginTop: hp('15%'),
    marginLeft: wp('3.5%'),
    alignItems: 'center',
  },
  billetera: {
    marginTop: hp('25%'),
  },
  spacer: {
    height: hp('10%'),
  },
  infoModal: {
    height: hp('40%'),
    width: wp('70%'),
    backgroundColor: '#212121',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoImage: {
    width: wp('60%'),
    height: hp('15%'),
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: wp('4%'),
    color: '#fff',
    textAlign: 'center',
    marginVertical: hp('0.5%'),
  },
  closeInfoButton: {
    marginTop: hp('3%'),
    backgroundColor: '#009BDE',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 10,
  },
  infoButtonText: {
    fontSize: wp('4%'),
    color: '#fff',
    textAlign: 'center',
  },
  mainImage: {
    width: wp('100%'),
    height: hp('100%'),
    resizeMode: 'cover'
  },
  iconImage:{
    alignSelf: 'center'
  }
});
