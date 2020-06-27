import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, 
  Image, TextInput, Modal, Button, TouchableOpacity,
  TouchableWithoutFeedback, Dimensions } from 'react-native';
import Customheader from '../Customheader';
import CurrentlocationButtom from '../Currentlocation'
import ModalBusqueda from './Modalbusqueda'
import ModalBusquedaTo from './Modalbusquedato'
import ModalPrecio from './Modalprecio'
import ModalComentario from './Modalcomentario'
import ModalAceptado from './Modalaceptado'

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import * as firebase from "firebase";

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import ModalMapa from './Modalmapa';
import ModalMapaTo from './Modalmapato';

import { Bounce } from 'react-native-animated-spinkit'

const marker = require("../../assets/userMarker.png");
const markerFrom = require("../../assets/markerFrom.png");
const markerTo = require("../../assets/markerTo.png");

const latitudeDelta = 0.0075
const longitudeDelta = 0.0075

class Solicitud extends React.Component {

    constructor(){
      super()
      this.state = {
       
        precio: "",
        driverPreAcept: null,
        modalaceptVisible: false,
        info:null,

      }

     
  
    }

  
    componentDidMount(){
      
      const user = firebase.auth().currentUser;
  
      const event = firebase.database().ref("prevcheck/"+user.uid)
      event.on('value', (snapshot) => {
          // console.log(snapshot)
          snapshot.val() ? (
          this.setState({
            modalaceptVisible: true,
            info: snapshot.val(),
          })
          )
          :
          this.setState({
            modalaceptVisible: false,
          })
   
      })
      // .then(

        // this.renderConductor = this.state.driverLocation.map((item)=>{ retunr(
        //   <Text>{item.coordenadas.latitude}</Text>
        // )})

      // )
      
      // navigator.geolocation.getCurrentPosition(
      //   (position)=>{
      //     const lat = position.coords.latitude;
      //     const lon = position.coords.longitude;

      //     const lati = lat + 0.002058;
  
      //     const url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+lon+","+lat;
      //       fetch(url)
      //       .then( res => res.json())
      //       .then( res => {
                
      //           this.setState({
      //               direccion: res.address.ShortLabel
      //           })

      //       })
  
      //     this.setState({
      //       fromregion:{
      //         latitude: lat - 0.002058,
      //         longitude: lon,
      //         latitudeDelta: latitudeDelta,
      //         longitudeDelta: longitudeDelta
      //       },
      //     })
         
      //   })

      this.setState({
        precio: this.props.precio,
      })

    }

    cambioVisible(){
      this.setState({
        modalaceptVisible: false,
      })
    }

    cancelarServicio(){
      this.props.byeModal()
      this.props.borrar()
    }

    subirPrecio(){
      this.setState({
        precio: parseInt(this.state.precio,10) + 500,
      })
    }

    bajarPrecio(){
      this.setState({
        precio: parseInt(this.state.precio,10) - 500,
      })
    }

    actualizarPrecio(){
      const user = firebase.auth().currentUser;
  
      const event = firebase.database().ref("request/"+user.uid)

      event.update({
        precio: this.state.precio,
      })
    }
  
    render(){
        const { fromregion, toregion, direccion, direccionTo, precio,
                  comentario, driverLocation, info  } = this.state;
        
    return (
        <SafeAreaView style={{flex: 1, width: Dimensions.get('window').width,
        height: Dimensions.get('window').height, }}>
           
            <Customheader byeModal={()=>this.cancelarServicio()} cancel="true" />
             <View style={{ flex:1, alignItems: "center", justifyContent: "center", top: 15, }}>
             <Text style={{color: "#FF4119"}}>Ofreciendo Tarifa a Conductores</Text>
             <Bounce size={300} color="#FF4119" />
            <SafeAreaView style={styles.pedidos}>
              <View style={{margin: 10, }}>
                <View style={{ flexDirection: "row", padding:20,  }}>
                  <View style={{ flex:1, justifyContent: "center", alignItems: "center", }}><Text onPress={()=>this.bajarPrecio()} >-500</Text></View>
                  <View style={{ flex:2, justifyContent: "center", alignItems: "center", }}><Text>Precio:  ${precio}</Text></View>
                  <View style={{ flex:1, justifyContent: "center", alignItems: "center", }}><TouchableOpacity onPress={()=>this.subirPrecio()} ><Text>+500</Text></TouchableOpacity></View>
                </View>
                  <Button 
                      title="Subir Tarifa"
                      onPress={()=>this.actualizarPrecio()}
                      color="#FF4119"
                    />
              </View>
            </SafeAreaView>
            </View>
          
           
              <ModalAceptado modalaceptVisible={this.state.modalaceptVisible} 
                  aceptado={this.props.showAceptado} 
                  cambioVisible={()=>this.cambioVisible()}
                  dt={info}
              />
           
            
      </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 8,
      },
      containerpos: {
        flex: 1,
      },
      pedidos: {
        position: 'absolute',
        backgroundColor: '#fff',
        left: 10,
        bottom: 0,
        right: 10,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2,
        borderColor: "gray",
      },
      markerFixed: {
        left: '51%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '35%',
      },
      markerFixedMap: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      },
      marker: {
        height: 48,
        width: 48
      },
      region: {
        color: '#000000',
        lineHeight: 20,
        margin: 20
      }
});

export default Solicitud;