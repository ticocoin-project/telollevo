import React, {useState, useEffect} from 'react'
import { View, Text, Modal, TouchableWithoutFeedback,
    Image, TextInput, SafeAreaView, StyleSheet, 
    FlatList, TouchableOpacity, Button } 
from 'react-native'

import * as firebase from "firebase";

import * as Speech from 'expo-speech';

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';

const latitudeDelta = 0.0075
const longitudeDelta = 0.0075

const urlImageP = require("../../assets/perfil.jpg");

const API = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?location=-72.50409999,7.90966000&f=pjson&text=';

const ModalRequest = (props) => {
    // console.log(props.dir)

    const [visual, setVisual] = useState(props.visiblereq)

    const [direc, setDir] = useState()
    const [sugest, setSugest] = useState()

    // console.log(sugest)

    let ponVal = (dir) => {
        // console.log(dir)
        props.valorDireccion(dir)
        props.hideModal()
        setDir()
    }

    let close = () => {
        props.hideModal()
        setDir()
    }

    useEffect(() => {
      setVisual(props.visiblereq)
      speak()
    }, [props.info.precio])

    let textChange = (text) => {
    
        setDir(text);
        
        fetch(`${API + text}`)
          .then(res => res.json())
          .then((json) => {
            // const { sugest } = json;
            const { suggestions: sugest } = json;
            // console.log(sugest)
            setSugest(sugest)
            setDir(text)
          })
          .catch(()=>{
            setSugest([])
            setDir(text)
          });
     
    }

    let salirPrev = (idC) => {

      let user = firebase.auth().currentUser;
      firebase.database().ref("prevcheck/"+idC+"/"+user.uid).remove()

    }

    let verWait = (idC) => {
      props.vW(idC)
      setVisual(false)

      let user = firebase.auth().currentUser;
  
      let event = firebase.database().ref("prevcheck/"+idC+"/"+user.uid)
      event.set({
        nombres: user.displayName,
        foto: user.photoURL,
        precio: props.info.precio,
        verhiculo: "",
        comentario: props.info.comentario,
        from: props.info.from,
        to: props.info.to,
      })

      setTimeout(()=>salirPrev(idC),25000)
    }

    const quini = parseInt(props.info.precio,10)+500
    const mil = parseInt(props.info.precio,10)+1000
    const dosmi = parseInt(props.info.precio,10)+2000

    let aumentoQ = (idC) => {
      props.vW()
      setVisual(false)

      let user = firebase.auth().currentUser;
  
      let event = firebase.database().ref("prevcheck/"+idC+"/"+user.uid)
      event.set({
        nombres: user.displayName,
        foto: user.photoURL,
        precio: quini,
        verhiculo: "",
        comentario: props.info.comentario,
        from: props.info.from,
        to: props.info.to,
      })

      setTimeout(()=>salirPrev(idC),25000)
    }

    let aumentoM = (idC) => {
      props.vW()
      setVisual(false)

      let user = firebase.auth().currentUser;
  
      let event = firebase.database().ref("prevcheck/"+idC+"/"+user.uid)
      event.set({
        nombres: user.displayName,
        foto: user.photoURL,
        precio: mil,
        verhiculo: "",
        comentario: props.info.comentario,
        from: props.info.from,
        to: props.info.to,
      })

      setTimeout(()=>salirPrev(idC),25000)
    }

    let aumentoD = (idC) => {
      props.vW()
      setVisual(false)

      let user = firebase.auth().currentUser;
  
      let event = firebase.database().ref("prevcheck/"+idC+"/"+user.uid)
      event.set({
        nombres: user.displayName,
        foto: user.photoURL,
        precio: dosmi,
        verhiculo: "",
        comentario: props.info.comentario,
        from: props.info.from,
        to: props.info.to,
      })

      setTimeout(()=>salirPrev(idC),25000)
    }


    let suggestionsSelected = (value) => {
            setDir(value),
            setSugest([])
    }

    let abrirModalMap = () => {
        props.showModalMap()
        setDir()
    } 

    let speak = () => {
      var thingToSay = 'Nuevo Pedido';
      Speech.speak(thingToSay);
    }

    return(
        <Modal transparent={true}
        visible={visual}
        >

                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}>
                        <View style={{width: "95%", 
                                backgroundColor: "#fff",
                                borderColor: "gray",
                                borderWidth: 2,
                                borderRadius: 20,
                                top: 20,
                                marginBottom: 30, 
                                flex: 1,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center'
                                    }}>

                               <View style={{flex: 4, height: '100%', width: '100%', }}>
                                  <MapView style={{flex: 1, height: '100%', width: '100%', }}
                                    // initialRegion={cregion}
                                    region={{
                                      latitude: 7.874017,
                                      longitude: -72.537969,
                                      latitudeDelta: latitudeDelta,
                                      longitudeDelta: longitudeDelta,
                                    }}
                                    rotateEnabled={false}
                                      > 
                                      <Marker
                                          coordinate={{
                                            latitude: 7.874017,
                                            longitude: -72.537969,
                                            latitudeDelta: latitudeDelta,
                                            longitudeDelta: longitudeDelta,
                                          }}
                                          image={require('../../assets/markerFrom.png')}
                                          />
                                  </MapView>
                               </View>
                               <View  style={{height: 80, paddingLeft:15, flexDirection: "row", }}>
                                {props.info.imagenurl ? 
                                <View style={{flex:1.5, justifyContent: "center"}}>
                                  <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={{uri: props.info.imagenurl}}  />
                                </View>
                                :
                                <View style={{flex:1.5, justifyContent: "center"}}>
                                  <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={urlImageP}  />
                                </View>
                                }
                                <View style={{flex:2.5, justifyContent: "center", }}>
                                  <Text style={{fontSize: 20}}>{props.info.nombres}</Text>
                                </View>
                              </View>
                               <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
                                      <Text>(A) Desde: {props.info.from}</Text>
                                      <Text>Para llevar a: {props.info.to}</Text>
                                      <Text>Oferta:  $${props.info.precio}</Text>
                               </View>
                               <View  style={{height: 50, paddingLeft:15, paddingRight:15, flexDirection: "row", }}>
                                        <View style={{flex:1.5, justifyContent: "center", padding:5, }}><Button 
                                                        title="Aceptar"
                                                        onPress={()=>verWait(props.idClient)}
                                                        color="#FF4119"
                                                      />
                                        </View>
                                </View>
                                <View  style={{height: 50, paddingLeft:15, paddingRight:15, flexDirection: "row", }}>
                                        <View style={{flex:1.5, justifyContent: "center", padding:5, }}><Button 
                                                        title={"Subir a $$ " + quini}
                                                        onPress={()=>aumentoQ(props.idClient)}
                                                        color="#FF4119"
                                                      />
                                        </View>
                                        <View style={{flex:1.5, justifyContent: "center", padding:5, }}><Button 
                                                        title={"Subir a $$ " + mil}
                                                        onPress={()=>aumentoM(props.idClient)}
                                                        color="#FF4119"
                                                      />
                                        </View>
                                        <View style={{flex:1.5, justifyContent: "center", padding:5, }}><Button 
                                                        title={"Subir a $$ " + dosmi}
                                                        onPress={()=>aumentoD(props.idClient)}
                                                        color="#FF4119"
                                                      />
                                        </View>
                                </View>
                                <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
                                      <Text onPress={()=>setVisual(false)}>Omitir</Text>
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

export default ModalRequest;