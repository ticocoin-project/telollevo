import React, {useState, useEffect} from 'react'
import { View, Text, Modal, TouchableWithoutFeedback,
    Image, TextInput, SafeAreaView, StyleSheet, ActivityIndicator,
    FlatList, TouchableOpacity, Button } 
from 'react-native'

import * as firebase from "firebase";

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';

const latitudeDelta = 0.0075
const longitudeDelta = 0.

// let date = new Date()

// let day = date.getDate()
// let month = date.getMonth() + 1
// let year = date.getFullYear()
// let hora = date.getHours()

// if(month < 10){
//   fecha = `${day}-0${month}-${year}-${hora}`
// }else{
//   fecha = `${day}-${month}-${year}-${hora}`
// }

const urlImageP = require("../../assets/perfil.jpg");

const API = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?location=-72.50409999,7.90966000&f=pjson&text=';

const ModalWait = (props) => {
    // console.log(props.dir)

    const [datosC,setDatosC] = useState()

    // const informacion = JSON.parse(props.info)

    useEffect(()=>{
        setDatosC(props.info)
        let user = firebase.auth().currentUser;
        let event = firebase.database().ref("prevcheck/"+props.idClienteA+"/"+user.uid)
        event.on('value', (snapshot) => {
          console.log(snapshot)
          snapshot.val() ? (

            snapshot.val().aceptado === "si" ? (
            /// aqui va la funcion que saca el aceptado
            props.showAceptado()
            )
            :
            null
          
          )
          :
          null
   
      })

    },[props.info])
   
 
    return(
        <Modal transparent={true}
        visible={props.visible}
        >
         
                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "rgba(0, 0, 0, 0.55)",
                        }}>

                          <View style={{flex:1, alignItems: "center", justifyContent: "center", }}>
                                <ActivityIndicator size="large" color="white" />
                                <Text style={{color: "white", fontSize:22,}}>Se ofrecio su oferta al cliente, </Text>
                                <Text style={{color: "white", fontSize:22,}}>Espere la aprobacion del mismo...</Text>
                          </View>

                        <View style={{width: "95%", 
                                backgroundColor: "#fff",
                                borderColor: "gray",
                                borderWidth: 2,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                height: 120,
                                bottom: 0,
                                flex: 1,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                    }}>

                        <View  style={{height: 80, paddingLeft:15, flexDirection: "row", }}>

                          { datosC 
                          ? 
                          (
                            <>
                            {
                            datosC.imagenurl
                            ? 
                            (
                              <View style={{flex:1, justifyContent: "center"}}>
                                  <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={{uri: datosC.imagenurl}}  />
                                  <Text style={{fontSize: 8}}>
                                            {datosC.nombres} 
                                  </Text>
                              </View>
                            )
                            :
                            (
                              <View style={{flex:1, justifyContent: "center"}}>
                                    <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={urlImageP}  />
                                    <Text style={{fontSize: 10}}>
                                              {datosC.nombres} 
                                    </Text>
                              </View>
                            )
                            }
                            <View style={{flex:3, justifyContent: "center", alignItems: "flex-start"}}>
                                      <Text style={{fontSize: 15}}>
                                        {datosC.from} 
                                      </Text>
                                      <Text style={{fontSize: 15}}>
                                        {datosC.to} 
                                      </Text>
                                      <Text style={{fontSize: 15}}>
                                        $$ {datosC.precio} 
                                      </Text>
                                      <Text style={{fontSize: 15}}>
                                        {datosC.comentario} 
                                      </Text>
                            </View>

                            </>
                          )
                          :
                          null
                          }          

                           
                                
                                
                                
                                
                              </View>
                               
                        </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      paddingTop: 25
    },
    autocompleteContainer: {
      marginLeft: 10,
      marginRight: 10
    },
    itemText: {
      fontSize: 15,
      margin: 2
    },
    descriptionContainer: {
      // `backgroundColor` needs to be set otherwise the
      // autocomplete input will disappear on text input.
      backgroundColor: '#F5FCFF',
      marginTop: 8
    },
    infoText: {
      textAlign: 'center'
    },
    titleText: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center'
    },
    directorText: {
      color: 'grey',
      fontSize: 12,
      marginBottom: 10,
      textAlign: 'center'
    },
    openingText: {
      textAlign: 'center'
    }
  })

export default ModalWait;