import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert,
    ActivityIndicator, TouchableOpacity } from 'react-native';

import RootHome from '../../RootHome';

import * as ImagePicker from 'expo-image-picker';

import * as firebase from "firebase";

const urlImageP = require("../../../assets//perfil.jpg");

const Imagen = (props) => {
    const user = firebase.auth().currentUser;

    const [url, setUrl] = useState();
    const [userId, setUserId] = useState(user.uid);
    const [loading, setLoading] = useState(false);

    const [step, setStep] = useState('initial');

    // const {nombre} = route.params;
    // const {apellido} = route.params;
    // const {email} = route.params;
    // const {photouri} = route.params;
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <Text onPress={() => updateOmitir()} style={{padding: 20, fontSize: 15}} >Omitir</Text>
    //       ),
    //     });
    //   }, [navigation]);
     
      useEffect(() => {
        // if (photouri){
        // setUrl(photouri)
        // }
        ImagePicker.requestCameraRollPermissionsAsync();
      });
    
      _takePhoto = async () => {
        setLoading(true);
        let pickerResult = await ImagePicker.launchCameraAsync({});
    
        _handleImagePicked(pickerResult);
      };
    
      _pickImage = async () => {
        setLoading(true);
        let pickerResult = await ImagePicker.launchImageLibraryAsync({});
    
        _handleImagePicked(pickerResult);
      };
    
      _handleImagePicked = async pickerResult => {
          try {
    
            if (!pickerResult.cancelled) {
              uploadUrl = await uploadImageAsync(pickerResult.uri);
              setUrl(uploadUrl)
    
            }
          } catch (e) {
            console.log(e);
            alert('No se pudo subir la imagen, Lo sentimos! Por favor intente de nuevo :(');
          } 
        };
      
    
      async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
      
        const ref = firebase
          .storage()
          .ref()
          .child(`imagesProfiles/${userId}`);
        const snapshot = await ref.put(blob);
      
        // We're done with the blob, close and release it
        blob.close();
      
        setLoading(false);
        return await snapshot.ref.getDownloadURL();
      }
    
      actualizarDatos = async () => {
            user.updateProfile({
              photoURL: url,
              displayName: props.nombre+" "+props.apellido,
            })
            user.updateEmail(props.email).then(function() {
              user.sendEmailVerification().then(function() {
                console.log("Verificacion de email")
                setStep('home')
                // navigation.push("HomeScreen");
              }).catch(function(error) {
                console.log("Error en V email"+error)
              });
            }).catch(function(error) {
              console.log("Error en Upd email"+error)
            }); 
       };
      
        let updateOmitir = () => {
          user.updateProfile({
            displayName: props.nombre+" "+props.apellido,
          })
          user.updateEmail(props.email).then(function() {
            user.sendEmailVerification().then(function() {
              console.log("Verificacion de email")
              // navigation.push("HomeScreen");
            }).catch(function(error) {
              console.log("Error en V email"+error)
            });
          }).catch(function(error) {
            console.log("Error en Upd email"+error)
          });
          
        }
    
        let alertOptions = () => {
            Alert.alert(
                'Opciones de Carga',
                'Elija de donde quiere la Imagen',
                [
                  {text: 'Camara', onPress: () => _takePhoto()},
                  {text: 'Galeria', onPress: () => _pickImage()},
                  {text: 'Salir', onPress: () => console.log("Salir")},
                ]
              )
        }
    
        if (loading === true) {
            return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#FF4119" />
                <Text>Cargando....</Text>
            </View>
            )
        }
    
        return (
          <>
          {step==='initial' && (

        !url ?
        <View style={styles.header}>
            <TouchableOpacity onPress={alertOptions}>
            <Image style={styles.profilepicWrap} source={urlImageP}  />
            <Text style={{fontSize:17, marginLeft:30}}>Cargar Imagen</Text>
            </TouchableOpacity>
        </View>
        :
        <>
        <View style={styles.header}>
            <TouchableOpacity onPress={alertOptions}>
            <Image style={styles.profilepicWrap} source={{uri: url}}  />
            <Text style={{fontSize:17, marginLeft:30}}>Editar Imagen</Text>
            </TouchableOpacity>
        </View>
        <View View style={styles.headfoot}>
            <TouchableOpacity style={styles.button} onPress={()=>actualizarDatos()} >
            <Text style={styles.botontitle}> Siguiente </Text>
            </TouchableOpacity>
        </View>
        </>
            
           )}


        {step==='home' && ( <RootHome /> )}
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
export default Imagen;