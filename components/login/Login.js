import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, 
  View, SafeAreaView, Keyboard, KeyboardAvoidingView, 
  TouchableWithoutFeedback, TextInput, Alert, Dimensions, } from 'react-native';

import Privacy from './extras/Privacy';
import Headermodals from './extras/Headermodals';
import Terms from './extras/Terms';
import Selectcountry from './extras/Selectcountry';

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import * as firebase from 'firebase';

import data from '../../Countries';

// Bandera por defecto
const defaultFlag = data.filter(
  obj => obj.name === 'Colombia'
  )[0].flag


const Login = () => {

    const recaptchaVerifier = React.useRef(null)
    const [modalTermsVisible, setmodalTermsVisible] = useState(false);
    const [modalPrivacyVisible, setmodalPrivacyVisible] = useState(false);
    const [modalCountryVisible, setmodalCountryVisible] = useState(false);
    const [countryCode, setCountryCode] = useState("+57");
    const [flag, setFlag] = useState(defaultFlag);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [step, setStep] = useState('initial');
    const [smsCode, setSmsCode] = useState();
    const [verificationId, setVerificationId]=useState();
    const [verificationCode, setVerificationCode] = useState()

    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

    const onSignIn = async () => { 
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
        await firebase.auth().signInWithCredential(credential).then(snap => {
            console.log(snap);
          }
          ).catch((error)=>{
          Alert.alert("Error","Ocurrio un error seguramente por que escribiste mal el codigo, vuelve a intentarlo",[{text: "Reintentar", onPress: () => setStep('phoneSubmitted')}])
        })

    }

    function showTermsModal() {
      setmodalTermsVisible(true)
    }

    function showCountryModal() {
      setmodalCountryVisible(true)
    }

    function CountryFlag(country,flag) {
      setCountryCode(country)
      setFlag(flag)
    }

    function onChangeText(value) {
      setPhoneNumber(value)
    }

    function showPrivacyModal() {
      setmodalPrivacyVisible(true)
    }

    const sentSms = async () => {
      const n = phoneNumber.length
      if (n>5){
        setStep('promptSmsCode')
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          countryCode+phoneNumber,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);   
      } else {
        Alert.alert("Número invalido","El número que escribiste tiene que ser valido",[{text: "Reintentar"}])
      }
    }

    function hideModal() {
      setmodalPrivacyVisible(false)
      setmodalTermsVisible(false)
      setmodalCountryVisible(false)
    }


    return (
          <View style={styles.container}>
              <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                {step==='initial' && (
                    <>
                    <View style={styles.headfoot}>
            <Text></Text>
            <Text></Text>
            <Text style={styles.headtitle}>Ingrese su número de teléfono para iniciar sesión</Text>
          </View>
          <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                          
                            {/* Phone input with native-base */}
                              {/* phone section  */}
                              <View style={styles.textInput}>
                                {/* country flag */}
                                <TouchableOpacity onPress={() => showCountryModal()}><Text style={{fontSize: 40}}>{flag}</Text></TouchableOpacity>
                                <TextInput
                                editable={false} 
                                selectTextOnFocus={false}
                                value={countryCode} 
                                />
                                
                                <TextInput
                                  style={styles.input}
                                  placeholder='Ingrese su número telefónico'
                                  placeholderTextColor='#adb4bc'
                                  keyboardType={'numeric'}
                                  returnKeyType='done'
                                  autoCapitalize='none'
                                  autoCorrect={false}
                                  secureTextEntry={false}
                                  autoFocus={true}
                                  value={phoneNumber}
                                  onChangeText={ (val) => onChangeText(val) }
                                  
                                />
                                </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                  </SafeAreaView>
          <View style={styles.headfoot}>
          <TouchableOpacity style={styles.button} onPress={()=> sentSms()}>
                <Text style={styles.botontitle}> Siguiente </Text>
              </TouchableOpacity>
            <Text style={styles.foottitle}><Text>Al pulsar &lt;&lt;Siguiente&gt;&gt;, acepta los</Text> <Text onPress={() => showTermsModal()} style={{textDecorationLine:"underline"}}>Términos y condiciones</Text> y la <Text onPress={() => showPrivacyModal()} style={{textDecorationLine:"underline"}}>Política de privacidad</Text></Text>
          </View>
          <Modal
            animationType="slide" // fade
            transparent={false}
            visible={modalTermsVisible}>
              <Headermodals txt="Términos y Condiciones" closeModal={() => hideModal()} />
              <Terms />
            </Modal>
            <Modal
            animationType="slide" // fade
            transparent={false}
            visible={modalCountryVisible}>
              <Selectcountry countryflag={(country,flag)=>CountryFlag(country,flag)} closeModal={() => hideModal()} />
            </Modal>
            <Modal
            animationType="slide" // fade
            transparent={false}
            visible={modalPrivacyVisible}>
              <Headermodals txt="Política de Privacidad" closeModal={() => hideModal()}/>
              <Privacy />
            </Modal>
          </>
                )}

                {step==='promptSmsCode' && (
                  <>
                  <View style={styles.headfoot}>
              <Text></Text>
              <Text></Text>
              <Text style={styles.headtitle}>Valida el codigo enviado a tu celular</Text>
              </View>
              <SafeAreaView style={styles.container}>
                  <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                      <View style={styles.container}>
                        
                          {/* Phone input with native-base */}
                            {/* phone section  */}
                            <View style={styles.textInput}>
                              {/* country flag */}
                              
                              <TextInput
                                style={styles.input}
                                placeholder='Codigo de Validacion'
                                placeholderTextColor='#adb4bc'
                                keyboardType={'numeric'}
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={false}
                                autoFocus={true}
                                value={smsCode}
                                onChangeText={(sms)=>setSmsCode(sms)}
                                
                              />
                              </View>
                            
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                </SafeAreaView>
              <View style={styles.headfoot}>
              <TouchableOpacity style={styles.button} onPress={onSignIn} >
              <Text style={styles.botontitle}> Verificar Codigo </Text>
              </TouchableOpacity>
              <Text style={styles.foottitle}>
              <Text onPress={()=>setStep('phoneSubmitted')} style={{textDecorationLine:"underline"}}>Reenviar codigo</Text>
              {'\n'}
              <Text onPress={()=>setStep('initial')} style={{textDecorationLine:"underline"}}>Cambiar de número</Text>
              </Text>
              </View>

              </>
                )}
      
          </View>
    );

}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // alignItems: 'center',
    backgroundColor: '#FF4119',
    padding: 10,
    borderRadius: 10,

  },
  headfoot: {
    // alignItems: 'center',
    backgroundColor: '#FFF',
    width: "90%",
  },
  botontitle: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
  foottitle: {
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    color: "gray",
  },
  headtitle: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginBottom: 10,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  textStyle: {
    padding: 5,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold'
  },
  closeButtonStyle: {
    padding: 8,
    alignItems: 'center', 
    backgroundColor: '#b44666',
  },
  textInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%"
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  }
});