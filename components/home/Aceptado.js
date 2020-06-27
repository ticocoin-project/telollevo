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

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import * as firebase from "firebase";

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import ModalMapa from './Modalmapa';
import ModalMapaTo from './Modalmapato';

const marker = require("../../assets/userMarker.png");
const markerFrom = require("../../assets/markerFrom.png");
const markerTo = require("../../assets/markerTo.png");

const urlImageP = require("../../assets/perfil.jpg");

const latitudeDelta = 0.0075
const longitudeDelta = 0.0075

const markerC = require('../../assets/markerV.png');

class Aceptado extends React.Component {

    constructor(){
      super()
      this.state = {
        toregion:{
          latitude: null,
          longitude: null,
          latitudeDelta: null,
          longitudeDelta: null
        },
        fromregion:{
          latitude: null, 
          longitude: null,
          latitudeDelta: null,
          longitudeDelta: null
        },
        direccion:null,
        direccionTo: "",
        precio: "",
        comentario: "",
        modalposVisible: false,
        modalmapVisible: false,
        modalposToVisible: false,
        modalmapToVisible: false,
        modalPrecioVisible: false,
        modalComentarioVisible: false,
        driverLocation: null,
      }

     
  
    }

  
    componentDidMount(){
  
      const event = firebase.database().ref("driverLocation")
      
      
      event.on('value', (snapshot) => {

        let dataSource = [];

        snapshot.forEach( (childSnapshot)=>{
              dataSource = dataSource.concat(childSnapshot.val().coordenadas)
        })
        // console.log(snapshot)
          this.setState({
            driverLocation: dataSource
          })
   
      })
      // .then(

        // this.renderConductor = this.state.driverLocation.map((item)=>{ retunr(
        //   <Text>{item.coordenadas.latitude}</Text>
        // )})

      // )
      
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const lati = lat + 0.002058;
  
          const url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+lon+","+lat;
            fetch(url)
            .then( res => res.json())
            .then( res => {
                
                this.setState({
                    direccion: res.address.ShortLabel
                })

            })
  
          this.setState({
            fromregion:{
              latitude: lat - 0.002058,
              longitude: lon,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta
            },
          })
         
        })

    }

    
    
    returnDriver(){
      const {driverLocation} = this.state;
    
      driverLocation.map((item)=>(
        <Text>{item.coordenadas.latitude}</Text>
      ))

    }

    onRegionChange = cregion => {
        
        const url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+cregion.longitude+","+(cregion.latitude+0.002058);
        fetch(url)
        .then( res => res.json())
        .then( res => {

          this.setState({
            direccion: res.address.ShortLabel
          })
        })

        this.setState({
          fromregion: cregion,
        })
      }

      onRegionChangeMap = cregion => {
        
        const url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+cregion.longitude+","+cregion.latitude;
        fetch(url)
        .then( res => res.json())
        .then( res => {

          this.setState({
            direccion: res.address.ShortLabel
          })
        })

        let ncregion = {
            latitude: cregion.latitude - 0.002058,
            longitude: cregion.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        }
        this.setState({
          fromregion: ncregion,
        })
      }

      onRegionChangeMapTo = cregion => {
        
        const url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+cregion.longitude+","+cregion.latitude;
        fetch(url)
        .then( res => res.json())
        .then( res => {

          this.setState({
            direccionTo: res.address.ShortLabel
          })
        })

        let ncregion = {
            latitude: cregion.latitude - 0.002058,
            longitude: cregion.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        }
        this.setState({
          toregion: ncregion,
        })
      }

      showModal = () => {
        this.setState({
          modalposVisible: true
        })
      }

      showModalPrecio = () => {
        this.setState({
          modalPrecioVisible: true
        })
      }

      showModalComentario = () => {
        this.setState({
          modalComentarioVisible: true
        })
      }

      showModalMap = () => {
        this.setState({
          modalmapVisible: true,
          modalposVisible: false,
        })
      }

      showModalTo = () => {
        this.setState({
          modalposToVisible: true
        })
      }

      showModalMapTo = () => {
        this.setState({
          modalmapToVisible: true,
          modalposToVisible: false,
        })
      }

      hideModal = () => {
        this.setState({
          modalposVisible: false,
          modalmapVisible: false,
          modalposToVisible: false,
          modalmapToVisible: false,
          modalPrecioVisible: false,
          modalComentarioVisible: false,
        })
      }
  
    centerLocation = () => {
          // this.setState({
          //   toregion:{
          //     latitude: null,
          //     longitude: null,
          //     latitudeDelta: null,
          //     longitudeDelta: null
          //   },
          // })
        navigator.geolocation.getCurrentPosition(
          
            (position)=>{
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              
              let region = {
                latitude: lat - 0.002058,
                longitude: lon,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              };

              this.setState({ fromregion: region });


              this.map.animateToRegion(region,1000)
             
            })

        
    
    } 

    valoresSet(cregion, direccion){
      let ncregion = {
        latitude: cregion.latitude - 0.002058,
        longitude: cregion.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    }
      this.setState({ fromregion:ncregion, direccion });
    }

    valoresSetTo(cregion, direccion){
      let ncregion = {
        latitude: cregion.latitude - 0.002058,
        longitude: cregion.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    }
      this.setState({ toregion:ncregion, direccionTo: direccion });
    }

    valorDireccion(dir){
      this.setState({ direccion: dir });
    }

    valorDireccionTo(dir){
      this.setState({ direccionTo: dir });
    }

    valorPrecio(dir){
      this.setState({ precio: dir });
    }

    valorComentario(dir){
      this.setState({ comentario: dir });
    }

    volerInicioL(){
      this.props.byeModal()
      this.props.borrar()
    }
  
  
    render(){
        const { fromregion, toregion, direccion, direccionTo, precio,
                  comentario, driverLocation  } = this.state;
        const { navigation } = this.props;
    return (
        <SafeAreaView style={{flex: 1}}>
            <Customheader byeModal={()=>this.volerInicioL()} cancel="true" />
             <View style={styles.container}>
             
            { fromregion.latitude ? 
            <MapView style={styles.mapStyle}
            // initialRegion={cregion}
            region={fromregion}
            onRegionChangeComplete={toregion.latitude ? null : this.onRegionChange}
            ref={(map)=>{this.map = map }}
            rotateEnabled={false}
              >   

                <Marker
                            coordinate={{
                              latitude: 7.874017,
                              longitude: -72.537969,
                              latitudeDelta: latitudeDelta,
                              longitudeDelta: longitudeDelta,
                            }}
                          >
                            <View style={null}>
                              <Image style={styles.markerC} source={markerC} />
                            </View>
                    </Marker>
                     
                  
            </MapView>
            :
            null  }

          
            <SafeAreaView style={styles.pedidos}>
                <View style={{alignItems:"center", padding: 20, }}><Text>Marca y modelo Vehiculo</Text></View>
                <View style={{alignItems:"center", paddingBottom: 20}}><Text style={{borderWidth:1, borderColor: "gray", padding: 8, borderRadius: 5, }}>Placa</Text></View>
                <View  style={{height: 50, paddingLeft:15, flexDirection: "row", }}>
                  {/* {user.photoURL ? 
                  <View style={{flex:1.5, justifyContent: "center"}}>
                    <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={{uri: user.photoURL}}  />
                  </View>
                  : */}
                  <View style={{flex:1, justifyContent: "center"}}>
                    <Image style={{height: 40, width:40, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={urlImageP}  />
                  </View>
                  {/* } */}
                  <View style={{flex:3, justifyContent: "center", }}>
                    <Text style={{fontSize: 15}}>Nombre y Apellido</Text>
                  </View>
                  <TouchableOpacity onPress={null} >
                  <View style={{flex:1, justifyContent: "center", alignItems: "flex-end", paddingRight:15}}>
                  <FontAwesome name="phone" style={{ color: "#FF4119", fontSize: 40}} />
                  </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={null} >
                <View style={{alignItems:"center", padding: 20, }}><FontAwesome name="star" style={{ color: "#FF4119", fontSize: 20}} /><Text>Ver Calificación Conductor</Text></View>
                </TouchableOpacity>
            </SafeAreaView>

            {/* <ModalComentariosClasificacion /> */}

            </View>
      </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 8,
      },
      mapStyle: {
        top: 8,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
        height: 250,
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
      },
      markerC: {
        height: 35,
        width: 35
      },
});

export default Aceptado;