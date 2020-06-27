import React, {useState, useEffect} from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, ScrollView, Button,
    Image, TextInput, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const urlImageP = require("../../assets/perfil.jpg");

import { Ionicons, FontAwesome } from '@expo/vector-icons';


import * as firebase from "firebase";
import { sin } from 'react-native-reanimated';

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let h = addZero(date.getHours());
let m = addZero(date.getMinutes());
let hora = h + ":" + m

if(month < 10){
   fecha = `${day}-0${month}-${year}-${hora}`
}else{
   fecha = `${day}-${month}-${year}-${hora}`
}



const ModalAceptado = (props) => {

  const [informacion,setInformacion]=useState(props.dt)
    
    const irAceptado = (id,precio,from,to,comentario) => {
      props.cambioVisible()
      props.aceptado()

      let user = firebase.auth().currentUser;
  
      let event = firebase.database().ref("historialCliente/"+user.uid+"/"+fecha+"/"+id)
      event.set({
        precio: precio,
        from: from,
        to: to,
        comentario: comentario
      })

      let consulta = firebase.database().ref("prevcheck/"+user.uid+"/"+id)
      consulta.set({
        aceptado: "si",
      })

      setTimeout(()=>firebase.database().ref("prevcheck/"+user.uid).remove(),5000)
      firebase.database().ref("request/"+user.uid).remove()

    }

    // useEffect(() => {
    //   setInformacion([props.dt])
    // }, [])

    const borrarConductor = (id) => {

      let user = firebase.auth().currentUser;
  
      let event = firebase.database().ref("prevcheck/"+user.uid)
      event.child(id).remove()

    }

    const options = [];

    for(let i in props.dt){
      options.push(
        <View 
          key={i}
          style={{width: "95%", 
                  backgroundColor: "#fff",
                  borderColor: "gray",
                  borderWidth: 2,
                  top: 10,
                  borderRadius: 10, 
                  height: 100, 
                  marginBottom: 15, }}  
              >
                
                <View  style={{height: 50, paddingLeft:15, flexDirection: "row", }}>
                          <View style={{flex:1, justifyContent: "center"}}>
                                    <Image style={{height: 40, width:40, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={{uri: props.dt[i].foto}}  />
                          </View>
                          <View style={{flex:3, justifyContent: "center", }}>
                                    <Text style={{fontSize: 15}}>{props.dt[i].nombres} </Text>
                                    <Text style={{fontSize: 15}}>Marca y Modelo Vehiculo</Text>
                          </View>
                          <View style={{flex:1, justifyContent: "center", alignItems: "flex-end", paddingRight:15}}>
                                  <Text style={{fontSize: 15}}>$${props.dt[i].precio}</Text>
                                  {/* <FontAwesome name="angle-right" style={{ color: "#FF4119", fontSize: 40}} /> */}
                          </View>
                </View>
                    <View  style={{height: 50, paddingLeft:15, paddingRight:15, flexDirection: "row", }}>
                        <View style={{flex:1.5, justifyContent: "center", padding:5, }}>
                          <Button 
                                  title="Cancelar"
                                  onPress={()=>borrarConductor(i)}
                                  color="#FF4119"
                                />
                        </View>
                        <View style={{flex:1.5, justifyContent: "center", padding:5, }}>
                            <Button 
                              title="Aceptar"
                              onPress={()=>irAceptado(i,props.dt[i].precio,props.dt[i].from,props.dt[i].to,props.dt[i].comentario)}
                              color="#FF4119"
                            />
                        </View>
                    </View>
          </View>
      )
    }


    return(
        <Modal transparent={true}
        visible={props.modalaceptVisible}
        >
                <View style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}>
                        <ScrollView style={{width: "100%", paddingLeft: 15, }}>

                          {/* {console.log(props.dt)} */}


                          { props.dt ? 

                            options
 
                          :
                          null
                          }

                        </ScrollView>
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

export default ModalAceptado;