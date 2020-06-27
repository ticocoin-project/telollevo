import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Alert,
    TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import * as firebase from "firebase";

import Email from './Email'
import Imagen from './Imagen'

const Nombres = () => {
    
      const [nombre, setNombre] = useState('');
      const [apellido, setApellido] = useState('');
      const [email, setEmail] = useState('');

      const [step, setStep] = useState('initial');

      function goEmail(nombre,apellido){
        let nombreV = nombre.length
        let apellidoV = apellido.length
        if (nombreV > 2 && apellidoV > 2){
        setNombre(nombre)
        setApellido(apellido)
        setStep('email')
        }else{
          Alert.alert("Nombre o apellido Invalido","Los nombre que escribiste tienen que ser validos",[{text: "Reintentar"}])
        }
      }

      function pEmail(email){
          setEmail(email)
          setStep('imagen')
      }

    // const { navigation } = this.props;
    return (
            <>
             {step==='initial' && (
               <>
                    <View style={styles.headfoot}>
                        <Text></Text>
                        <Text></Text>
                        <Text style={styles.headtitle}>Bienvenido!</Text>
                        <Text style={styles.titleB}>Conozcámonos</Text>
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
                                          placeholder='Nombre'
                                          placeholderTextColor='#adb4bc'
                                          returnKeyType='done'
                                          autoCapitalize='none'
                                          autoCorrect={false}
                                          secureTextEntry={false}
                                          autoFocus={true}
                                          value={nombre}
                                          onChangeText={(sms)=>setNombre(sms)}
                                          
                                        />
                                        <Text></Text>
                                        <TextInput
                                          style={styles.input}
                                          placeholder='Apellido'
                                          placeholderTextColor='#adb4bc'
                                          returnKeyType='done'
                                          autoCapitalize='none'
                                          autoCorrect={false}
                                          secureTextEntry={false}
                                          value={apellido}
                                          onChangeText={(sms)=>setApellido(sms)}
                                          
                                        />
                                      </View>
                                      
                                </View>
                              </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                          </SafeAreaView>
                        <View View style={styles.headfoot}>
                        <TouchableOpacity style={styles.button} onPress={()=>goEmail(nombre,apellido)} >
                        <Text style={styles.botontitle}> Siguiente </Text>
                        </TouchableOpacity>
                        </View>
                  </>
            )}

            {step==='email' && (
              <>
              <Email pEmail={(email)=>pEmail(email)} nombre={nombre} />
              </>
              )}

            {step==='imagen' && (
              <>
              <Imagen nombre={nombre} apellido={apellido} email={email} />
              </>
              )}


            </>
        )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    headfoot: {
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    headtitle: {
      fontSize: 35,
      alignItems: 'center',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    titleB: {
      fontSize: 20,
      alignItems: 'center',
      textAlign: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#FF4119',
      padding: 10,
      borderRadius: 10,
      width: "90%",
      marginBottom: 20,
    },
    headfoot: {
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    botontitle: {
      fontSize: 25,
      alignItems: 'center',
      fontWeight: 'bold',
      textAlign: 'center',
      color: "white"
    },
    input: {
      width: "100%",
      borderBottomWidth: 2,
      borderBottomColor: "gray",
    },
    textInput: {
      width: "80%"
    },
    header: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    profilepicWrap:{
        width: 180,
        height: 180,
        borderRadius: 100,
        borderColor: "#FF4119",
        borderWidth: 8,
    },
});
export default Nombres;