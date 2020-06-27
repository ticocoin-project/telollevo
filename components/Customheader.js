import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SwitchButton from 'switch-button-react-native';

import ModalRequest from './driver/Modalrequest'

import * as firebase from "firebase";

import geohash from "ngeohash";


function Customheader ({title, share, more, menu, atras, tooggle, eU, cU, cV, cancel, salir, togle, showSerDriverModal, byeModal, finalizar, verI }){

    const [activeSwitch, setActiveSwitch] = useState(1)
    const [conductorValidado, setConductorValidado] = useState()
    const[request,setRequest]=useState()

    // const [active, setActive] = useState(false)
    

    const user = firebase.auth().currentUser;

    // let enviarUbicacion = () => {
    //   navigator.geolocation.getCurrentPosition(
    //     (position)=>{
    //         const lat = position.coords.latitude;
    //         const lon = position.coords.longitude;
  
    //         const range = getGeohashRange(lat, lon, 0.5);
    //         // 0.5 es un radio de 2 km
    //         const event = firebase.database().ref().child("request");
    //         const query = event
    //                     .orderByChild("geohash")
    //                     .startAt(range.lower)
    //                     .endAt(range.upper);
  
    //         query.on("value", snap => {
    //           let data = [];
    //           snap.forEach( (childSnapshot)=>{
    //             data = data.concat(childSnapshot.val())
    //           })
    //           setRequest(data)
    //           // console.log(snap.val())
    //         })
    //     })
    //   const user = firebase.auth().currentUser;
    //   this.interval = setInterval(() => {
    //     navigator.geolocation.getCurrentPosition(
    //       (position)=>{
    //           const lat = position.coords.latitude;
    //           const lon = position.coords.longitude;
    
    //           var driverCurrentLocation = {
    //               "latitude": lat,
    //               "longitude": lon
    //           };
  
    //           firebase.database().ref("driverLocation/"+user.uid+"/coordenadas").set(driverCurrentLocation)
    //           .then(function() {
    //               console.log("Document successfully written!");
    //           })
    //           .catch(function(error) {
    //               console.error("Error writing document: ", error);
    //           });      
              
    //       })
    //   }, 1000);
    //   // setIntervalId(interval)
    //   console.log("enviando")
    // }
  
    // let cancelarUbicacion = () => {
    //   clearInterval(this.interval)
    // }

    // let getGeohashRange = (latitude,longitude,distance) => {
    //   const lat = 0.0144927536231884; // degrees latitude per mile
    //   const lon = 0.0181818181818182; // degrees longitude per mile
    
    //   const lowerLat = latitude - lat * distance;
    //   const lowerLon = longitude - lon * distance;
    
    //   const upperLat = latitude + lat * distance;
    //   const upperLon = longitude + lon * distance;
    
    //   const lower = geohash.encode(lowerLat, lowerLon);
    //   const upper = geohash.encode(upperLat, upperLon);
    
    //   return {
    //     lower,
    //     upper
    //   };
    // }

    let envUb = (val) => {
      // envU()
      eU()
      setActiveSwitch(val)
      // if (!conductorValidado){
      //   alert("validado si")
      // }else{
      //   alert("no valid")
      // }
      
    }

    let cancelEnvUb = (val) => {
      // cUb()
      cU()
      setActiveSwitch(val)
    }

    let quieroSerConductor = (val) => {
      showSerDriverModal()
      // navigation.navigate("SerConductor")
      setActiveSwitch(val)
    }

    // let volverHomeC = () => {
    //   closeModal
    //   // navigation.push("Home")
    // }

    let nothing = (val) => {
      setActiveSwitch(val)
    }

    let cerrarTodo = () => {
      // navigation.goBack()
      // navigation.closeDrawer();
      // navigation.closeDrawer();
      // navigation.closeDrawer();
    }

    let hideM = () => {
      byeModal()
    }

    return(
        
      <View style={{flexDirection: "row", height: 50, top: 15, paddingLeft:5, paddingRight: 5, borderBottomWidth:1, borderColor: "gray", zIndex:15, backgroundColor: "white"}}>
        <View style={{flex:0.5, justifyContent: "center"}}>
          { menu ? 
          <TouchableOpacity onPress={togle}>
          <Ionicons name="md-menu" size={32} style={{textAlign: "center", color: "#FF4119"}}/>
          </TouchableOpacity>
          : null }
          { atras ? 
          <TouchableOpacity onPress={()=>cerrarTodo()}>
          <Ionicons name="md-arrow-round-back" size={32} style={{textAlign: "center", color: "#FF4119"}}/>
          </TouchableOpacity>
          : null }
        </View>
        <View style={{flex:2.5, justifyContent: "center"}}>
        { title ? 
        <Text style={{paddingLeft:15, fontSize: 20, fontWeight: "bold"}}>{title}</Text>
        :
        null }
        { tooggle ?
          cV ?
        <SwitchButton
        onValueChange={ activeSwitch === 1 ? (val)=>envUb(val) : (val)=>cancelEnvUb(val) }     // this is necessary for this component
        text1 = 'Ocupado'                        // optional: first text in switch button --- default ON
        text2 = 'Libre'                       // optional: second text in switch button --- default OFF
        switchWidth = {250}                 // optional: switch width --- default 44
        switchHeight = {40}                 // optional: switch height --- default 100
        switchdirection = 'ltr'             // optional: switch button direction ( ltr and rtl ) --- default ltr
        switchBorderRadius = {100}          // optional: switch border radius --- default oval
        switchSpeedChange = {500}           // optional: button change speed --- default 100
        switchBorderColor = {activeSwitch === 1 ? '#FF0000' : '#65C740'}       // optional: switch border color --- default #d4d4d4
        switchBackgroundColor = '#FFFFFF'      // optional: switch background color --- default #fff
        btnBorderColor = {activeSwitch === 1 ? '#FF0000' : '#65C740'}          // optional: button border color --- default #00a4b9
        btnBackgroundColor = {activeSwitch === 1 ? '#FF0000' : '#65C740'}       // optional: button background color --- default #00bcd4
        fontColor = '#FFFFFF'               // optional: text font color --- default #b1b1b1
        // activeFontColor = '#fff'            // optional: active font color --- default #fff
        />
        :
        <SwitchButton
        onValueChange={ activeSwitch === 1 ? (val)=>quieroSerConductor(val) : (val)=>nothing(val) }     // this is necessary for this component
        text1 = 'Ocupado'                        // optional: first text in switch button --- default ON
        text2 = 'Libre'                       // optional: second text in switch button --- default OFF
        switchWidth = {250}                 // optional: switch width --- default 44
        switchHeight = {40}                 // optional: switch height --- default 100
        switchdirection = 'ltr'             // optional: switch button direction ( ltr and rtl ) --- default ltr
        switchBorderRadius = {100}          // optional: switch border radius --- default oval
        switchSpeedChange = {500}           // optional: button change speed --- default 100
        switchBorderColor = {activeSwitch === 1 ? '#FF0000' : '#65C740'}       // optional: switch border color --- default #d4d4d4
        switchBackgroundColor = '#FFFFFF'      // optional: switch background color --- default #fff
        btnBorderColor = {activeSwitch === 1 ? '#FF0000' : '#65C740'}          // optional: button border color --- default #00a4b9
        btnBackgroundColor = {activeSwitch === 1 ? '#FF0000' : '#65C740'}       // optional: button background color --- default #00bcd4
        fontColor = '#FFFFFF'               // optional: text font color --- default #b1b1b1
        // activeFontColor = '#fff'            // optional: active font color --- default #fff
        />
        :
        null
        }
        </View>
        { share ?
        <View style={{flex:0.5, justifyContent: "center"}}>
           <Ionicons name="md-share" size={32} style={{textAlign: "center", color: "#FF4119"}}/>
        </View>
        : null }
        { more ? 
        <View style={{flex:0.5, justifyContent: "center"}}>
          <Ionicons name="md-more" size={32} style={{textAlign: "center", color: "#FF4119"}} onPress={()=>firebase.auth().signOut()} />
        </View>
          : null }
          { cancel ? 
        <View style={{flex:1, justifyContent: "center"}}>
          <Text style={{textAlign: "center", color: "#FF4119"}} onPress={()=>hideM()} >Cancelar</Text>
        </View>
          : null }
          { salir ? 
        <View style={{flex:1, justifyContent: "center"}}>
          <Text style={{textAlign: "center", color: "#FF4119"}} onPress={()=>hideM()} >Salir</Text>
        </View>
          : null }
          { finalizar ? 
        <View style={{flex:1, justifyContent: "center"}}>
          <Text style={{textAlign: "center", color: "#FF4119"}} onPress={verI} >Finalizar Pedido</Text>
        </View>
          : null }

          {/* { console.log(request) }

                {
                    request ? (
                      request.map((item, index)=> (
                        
                        <ModalRequest
                            key={index}
                            info={item}
                            visiblereq={true}
                          />
                      ) )
                    )
                    :
                    null
                  } */}

      </View>
    )
  }

  export default Customheader;