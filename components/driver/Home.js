import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native';

import CustomMenuD from '../Custommenudriver'
import Customheader from '../Customheader';

import Solicitudes from './Solicitudes';
import Clasificacion from './Clasificacion';
import Ingresos from './Ingresos';
import Pagos from './Pagos';

import Aceptado from './Aceptado'

import ModalRequest from './Modalrequest'
import ModalWait from './Modalwaiting'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import SerD from './Serdriver';
import Headermodals from '../login/extras/Headermodals'

import * as Speech from 'expo-speech';

import * as firebase from "firebase";

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import SideMenu from 'react-native-side-menu'
import geohash from "ngeohash";

export default class HomeD extends React.Component {
  constructor(){
    super()
    this.state = {
      isOpen:false,
      steps: "inicio",
      step: "solicitudes",
      solicitudes:true,
      ingresos:false,
      clasificacion:false,
      pagos:false,
      conductorValidado: null,
      request: null,
      visibleesperar:false,
      cliente: null,
      idClienteAceptado: null,
      visibleRequerimiento: false,
    
    }
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  updateMenu(isOpen){
      this.setState({
        isOpen
      })
  }

  setSolicitudes(){
    this.setState({
      step: "solicitudes",
      solicitudes:true,
      ingresos:false,
      clasificacion:false,
      pagos:false,
    })
  }

  setIngresos(){
    this.setState({
      step: "ingresos",
      solicitudes:false,
      ingresos:true,
      clasificacion:false,
      pagos:false,
    })
  }

  setClasificacion(){
    this.setState({
      step: "clasificacion",
      solicitudes:false,
      ingresos:false,
      clasificacion:true,
      pagos:false,
    })
  }

  setPagos(){
    this.setState({
      step: "pagos",
      solicitudes:false,
      ingresos:false,
      clasificacion:false,
      pagos:true,
    })
  }

  showSerDriverModal() {
    this.setState({
      steps: "serconductor"
    })
  }

  hideModal() {
    this.setState({
      steps: "inicio"
    })
  }

  hideEsperar(){
    this.setState({
      visibleesperar: false,
    })
  }

  visibleW(i) {

    this.cancelarUbicacion()

    this.setState({
      visibleesperar: true,
      request: null,
      visibleRequerimiento: false,
      idClienteAceptado: i,
    })
    
    firebase.database().ref("request/"+i)
    .on("value", (snapshot)=>{
      this.setState({
        cliente: snapshot.val(),
      })
    })

    setTimeout(()=>this.enviarUbicacion(),25000)
    setTimeout(()=>this.hideEsperar(),25000)
  }

  hideW() {
    this.setState({
      visibleesperar: false,
    })
  }

  speak() {
    var thingToSay = 'Nuevo Pedido';
    Speech.speak(thingToSay);
  }
  
  componentDidMount(){
    const user = firebase.auth().currentUser;
    firebase.database()
      .ref("users/"+user.uid+"/validadoConductor")
      .on('value', (snapshot) => {

        // console.log(snapshot.val())

        // if (val!==null){
        this.setState({
          conductorValidado: snapshot.val()
        })
      // }
       
      })


      navigator.geolocation.getCurrentPosition(
        (position)=>{
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
  
            const range = this.getGeohashRange(lat, lon, 0.5);
            // 0.5 es un radio de 2 km
            const event = firebase.database().ref().child("request");
            const query = event
                        .orderByChild("geohash")
                        .startAt(range.lower)
                        .endAt(range.upper);
  
            query.on("value", snap => {
              
              !snap.val() ? (
                  this.setState({
                  request: null,
                  })
              )
              :
              null
              // setRequest(data)
              // console.log(snap.val())
            })
        })
      


  }

  getGeohashRange = (latitude,longitude,distance) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile
  
    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;
  
    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;
  
    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);
  
    return {
      lower,
      upper
    };
  }

  enviarUbicacion = () => {
    
    const user = firebase.auth().currentUser;
    this.interval = setInterval(() => {

      if (!this.state.request){
        navigator.geolocation.getCurrentPosition(
        (position)=>{
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
  
            const range = this.getGeohashRange(lat, lon, 0.5);
            // 0.5 es un radio de 2 km
            const event = firebase.database().ref().child("request");
            const query = event
                        .orderByChild("geohash")
                        .startAt(range.lower)
                        .endAt(range.upper);
  
            query.once("value", snap => {
              // let data = [];
              // snap.forEach( (childSnapshot)=>{
              //   data = data.concat(childSnapshot.val())
              // })
              // for (let i in snap){
              //     data = data.concat(snap[i])
              // } 
              this.setState({
                request: snap.val(),
                visibleRequerimiento: true,
              })
              
              // setRequest(data)
              // console.log(snap.val())
            })
        })
      }
      

      navigator.geolocation.getCurrentPosition(
        (position)=>{
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
  
            var driverCurrentLocation = {
                "latitude": lat,
                "longitude": lon
            };

            firebase.database().ref("driverLocation/"+user.uid+"/coordenadas").set(driverCurrentLocation)
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });      
            
        })
    }, 1000);
    // setIntervalId(interval)
    console.log("enviando")
  }

  cancelarUbicacion = () => {
    clearInterval(this.interval)
    const user = firebase.auth().currentUser;
    firebase.database()
      .ref("driverLocation/"+user.uid).remove()
  }

  showAceptado = () => {
    this.setState({
      steps:"aceptado",
      visibleesperar: false,
    })
    this.cancelarUbicacion()
  }

  verInicio = () => {
    this.setState({
      steps:"inicio",
    })
    // this.cancelarUbicacion()
  }


  render(){
  const { step, solicitudes, ingresos, clasificacion, pagos, steps, conductorValidado, request, visibleesperar, cliente, visibleRequerimiento } = this.state
    console.log(request)
  const clientReq = []
  if (request){
    for (let i in request){
      clientReq.push(
        <ModalRequest
              key={i}
              info={request[i]}
              visiblereq={visibleRequerimiento}
              vW={(id)=>this.visibleW(id)}
              idClient={i}
          />
      )
    }
  }

  const Drawer = createDrawerNavigator();
  
  return (
    <>
    {steps==='inicio' && (
    <NavigationContainer>
    <Drawer.Navigator 
      drawerContent={()=><CustomMenuD cClient={this.props.cClient} cU={()=>this.cancelarUbicacion()}/>}
      drawerStyle={{
        width: "70%",
      }}
        >
      <Drawer.Screen name="conductor" 
      options={{swipeEnabled:false}}
      >
            {({navigation})=>(
              <>
              <Customheader tooggle="true" menu="true" 
                  cV={conductorValidado ? conductorValidado : null }
                  togle={() => navigation.openDrawer()} 
                  showSerDriverModal={()=>this.showSerDriverModal()}
                  cU={()=>this.cancelarUbicacion()}
                  eU={()=>this.enviarUbicacion()} 
                    />
                  <View style={styles.container}>
                      {step==='solicitudes' && (
                          <Solicitudes />
                      )}
                      {step==='ingresos' && (
                          <Ingresos />
                      )}
                      {step==='clasificacion' && (
                          <Clasificacion />
                      )}
                      {step==='pagos' && (
                          <Pagos />
                      )}
                  </View>
                  <View style={styles.footer}>
                    <TouchableWithoutFeedback onPress={()=>this.setSolicitudes()}>
                        <View style={styles.button}>
                          {solicitudes===true ? 
                          <>
                          <Ionicons name='ios-list-box' size={30} color="#FF4119" />
                          <Text style={{color: "#FF4119", fontSize: 11}}>Solicitudes</Text> 
                          </>
                          : 
                          <>
                          <Ionicons name='ios-list' size={30} color="gray" />
                          <Text style={{color: "gray", fontSize: 11}}>Solicitudes</Text>
                          </>
                          }
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.setIngresos()}>
                        <View style={styles.button}>
                            {ingresos===true ? 
                              <>
                              <Ionicons name='md-cash' size={30} color="#FF4119" />
                              <Text style={{color: "#FF4119", fontSize: 11}}>Ingresos</Text> 
                              </>
                              : 
                              <>
                              <Ionicons name='md-cash' size={30} color="gray" />
                              <Text style={{color: "gray", fontSize: 11}}>Ingresos</Text>
                              </>
                              }
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.setClasificacion()}>
                        <View style={styles.button}>
                             {clasificacion===true ? 
                              <>
                              <Ionicons name='ios-star' size={30} color="#FF4119" />
                              <Text style={{color: "#FF4119", fontSize: 11}}>Clasificación</Text> 
                              </>
                              : 
                              <>
                              <Ionicons name='ios-star-outline' size={30} color="gray" />
                              <Text style={{color: "gray", fontSize: 11}}>Clasificación</Text>
                              </>
                              }
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.setPagos()}>
                        <View style={styles.button}>
                            {pagos===true ? 
                              <>
                              <Ionicons name='md-wallet' size={30} color="#FF4119" />
                              <Text style={{color: "#FF4119", fontSize: 11}}>Pagos</Text> 
                              </>
                              : 
                              <>
                              <Ionicons name='md-wallet' size={30} color="gray" />
                              <Text style={{color: "gray", fontSize: 11}}>Pagos</Text>
                              </>
                              }
                        </View>
                    </TouchableWithoutFeedback>
                  </View>
                    
                  {
                    request ? (

                      // console.log(request)
                      clientReq
                      
                      // request.map((item, index)=> (

                      
                        // <ModalRequest
                        //     key={index}
                        //     info={item}
                        //     visiblereq={true}
                        //     vW={()=>this.visibleW()}
                        //   />
                      // ) )
                    )
                    :
                    null
                  }

              <ModalWait visible={visibleesperar} 
                        info={cliente} 
                        // envU={()=>this.enviarUbicacion()} 
                        hE={()=>this.hideEsperar()}
                        idClienteA={this.state.idClienteAceptado}
                        showAceptado={()=>this.showAceptado()}
                         />

                  </>
              )}
              </Drawer.Screen>
              
            </Drawer.Navigator>
          </NavigationContainer>
    )}

    {steps==='serconductor' && (
      <SerD byeModal={()=>this.hideModal()} />
    )}

    {steps==='aceptado' && (
      <Aceptado cU={()=>this.cancelarUbicacion()} vI={()=>this.verInicio()}/>
    )}
    </>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    top: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    height: 50,
    borderTopWidth: 1,
    borderColor: "gray",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 80,
    height: 35,
  },
});
