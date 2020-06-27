import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Alert,
    TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import * as firebase from "firebase";

const Email = (props) => {

  const [email, setEmail] = useState('');

    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }

    function goImagen(email){
        let emailV = validate(email);
        if (emailV==1){
        props.pEmail(email)
        }else{
          Alert.alert("Email invalido","El email que escribiste tiene que ser valido",[{text: "Reintentar"}])
        }
    }

    
    return (
        <>
                <View style={styles.headfoot}>
                    <Text></Text>
                    <Text></Text>
                    <Text style={styles.headtitle}>Hola! {props.nombre}</Text>
                    <Text style={styles.titleB}>¿Cual es tu correo electronico?</Text>
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
                                      keyboardType={'email-address'}
                                      placeholder='ejemplo@mail.com'
                                      placeholderTextColor='#adb4bc'
                                      returnKeyType='done'
                                      autoCapitalize='none'
                                      autoCorrect={false}
                                      secureTextEntry={false}
                                      autoFocus={true}
                                      value={email}
                                      onChangeText={(sms)=>setEmail(sms)}
                                      
                                    />
                                    
                                  </View>
                                  
                            </View>
                          </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                      </SafeAreaView>
                    <View View style={styles.headfoot}>
                    <TouchableOpacity style={styles.button} onPress={()=>goImagen(email)} >
                    <Text style={styles.botontitle}> Siguiente </Text>
                    </TouchableOpacity>
                    </View>
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
export default Email;