import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, 
  Image, TextInput, Modal, Button, TouchableOpacity,
  TouchableWithoutFeedback, Alert, Dimensions } from 'react-native';
import Customheader from '../Customheader';
import CurrentlocationButtom from '../Currentlocation'
import ModalBusqueda from './Modalbusqueda'
import ModalBusquedaTo from './Modalbusquedato'
import ModalPrecio from './Modalprecio'
import ModalComentario from './Modalcomentario'

import Solicitud from './Solicitud'
import Aceptado from './Aceptado'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import CustomMenu from '../Custommenu'
import Menu from '../Menu'

import SideMenu from 'react-native-side-menu'

import geohash from "ngeohash";

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import * as firebase from "firebase";

import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import ModalMapa from './Modalmapa';
import ModalMapaTo from './Modalmapato';

const marker = require("../../assets/userMarker.png");
const markerFrom = require("../../assets/markerFrom.png");
const markerTo = require("../../assets/markerTo.png");
const markerC = require('../../assets/markerV.png');

const latitudeDelta = 0.0075
const longitudeDelta = 0.0075

class Home extends React.Component {

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
        isOpen:false,
        step: "inicio"
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
          step: "inicio",
        })
      }

    borrardatos = () => {
      this.setState({
            toregion:{
              latitude: null,
              longitude: null,
              latitudeDelta: null,
              longitudeDelta: null
            },
            direccionTo: "",
            precio: "",
            comentario: "",
      })    

      let user = firebase.auth().currentUser;
      firebase.database().ref("request/"+user.uid).remove()
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

    showRequest = () => {
      this.setState({
        step:"request"
      })
    }

    showAceptado = () => {
      this.setState({
        step:"aceptado"
      })
    }

    irarequest(direccion, direccionTo, precio, comentario, fromregion){
      // const req = this.showRequest();
      let $this = this;
      const user = firebase.auth().currentUser;
      let direccionV = direccion.length
      let direccionToV = direccionTo.length
      let precioV = precio.length
      let comentarioV = comentario.length
      let geo = geohash.encode(fromregion.latitude, fromregion.longitude);
      if (direccionV > 5 && direccionToV > 5 && precioV > 3 && precio > 2999 && comentarioV > 5){
        firebase.database().ref("request/"+user.uid).set({
          nombres: user.displayName,
          imagenurl: user.photoURL,
          from: direccion,
          to: direccionTo,
          precio,
          comentario,
          geohash: geo,
        })
        .then(function() {
            // req
            $this.showRequest()
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
      }else{
        Alert.alert("Informacion Incomplerta","Para hacer una solicitud todos los campos deben estar completos, agradecemos no deje campos en blanco, tambien recuerde que el precio minimo es de $3000",[{text: "Reintentar"}])
      }
    }
  
  
    render(){
        const { fromregion, toregion, direccion, direccionTo, precio,
                  comentario, driverLocation, step  } = this.state;
        
        const Drawer = createDrawerNavigator();
    return (

      <>
      {step==='inicio' && (

        <NavigationContainer>
                <Drawer.Navigator 
                  drawerContent={()=><CustomMenu cDriver={this.props.cDriver}/>}
                  drawerStyle={{
                    width: "70%",
                  }}
                    >
                  <Drawer.Screen name="cliente" 
                  options={{swipeEnabled:false}}
                  >
                        {({navigation})=>(

                
        <SafeAreaView style={{flex: 1}}>
            
            <Customheader title="Domicilios" share="true" more="true" menu="true" togle={() => navigation.openDrawer()} />
             <View style={styles.container}>
             
            { fromregion.latitude ? 
            <MapView style={styles.mapStyle}
            // initialRegion={cregion}
            region={fromregion}
            onRegionChangeComplete={toregion.latitude ? null : this.onRegionChange}
            ref={(map)=>{this.map = map }}
            rotateEnabled={false}
              >   

                {
                    driverLocation ? (
                      driverLocation.map((item, index)=> (
                        <Marker
                            key={index}
                            coordinate={{
                              latitude: item.latitude,
                              longitude: item.longitude,
                              latitudeDelta: latitudeDelta,
                              longitudeDelta: longitudeDelta,
                            }}
                          >
                            <View style={null}>
                              <Image style={styles.markerC} source={markerC} />
                            </View>
                          </Marker>
                      ) )
                    )
                    :
                    null
                  }
                  
                  { toregion.latitude ? (
                  <>
                  <Polyline
                      coordinates={[
                        { latitude: fromregion.latitude + 0.002058,  longitude: fromregion.longitude, latitudeDelta: 0.0505, longitudeDelta: 0.0505},
                        { latitude: toregion.latitude + 0.002058,  longitude: toregion.longitude, latitudeDelta: 0.0505, longitudeDelta: 0.0505},
                      ]}
                      strokeColor="#FF4119" 
                      strokeWidth={6}
                    />
                    <Marker
                    coordinate={{latitude: fromregion.latitude + 0.002058,  longitude: fromregion.longitude, latitudeDelta: 0.0505, longitudeDelta: 0.0505}}
                    >
                      <View style={null}>
                        <Image style={styles.markerC} source={markerFrom} />
                      </View>
                    </Marker>
                    <Marker
                    coordinate={{ latitude: toregion.latitude + 0.002058,  longitude: toregion.longitude, latitudeDelta: 0.0505, longitudeDelta: 0.0505}}
                    >
                    <View style={null}>
                      <Image style={styles.markerC} source={markerTo} />
                    </View>
                    </Marker> 
                  </>
                    )
                    :
                    null
                      }
            </MapView>
            :
            null  }

                  
            {toregion.latitude ? null:
            <View style={styles.markerFixed}>
            <Image style={styles.marker} source={marker} />
            </View>
            }
             
            <SafeAreaView style={styles.pedidos}>
                <TouchableWithoutFeedback  onPress={()=>this.showModal()}>
                <View style={{flexDirection: "row", height: 35, paddingLeft:15, paddingRight: 15, zIndex:15}}  >
                <View style={{flex:0.5, justifyContent: "center"}}>
                <Image source={require("../../assets/from.png")} style={{height:25, width: 25,}}/>
                </View>
                <View style={{flex:3, justifyContent: "center"}}  >
                <TextInput
                    style={{ height: 35, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                    editable={false}
                    value={direccion}
                    placeholder='Donde? Recoger'
                  />
                </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>this.showModalTo()}>
                <View style={{flexDirection: "row", height: 35, paddingLeft:15, paddingRight: 15, zIndex:15}}>
                <View style={{flex:0.5, justifyContent: "center"}}>
                <Image source={require("../../assets/to.png")} style={{height:25, width: 25,}}/>
                </View>
                <View style={{flex:3, justifyContent: "center"}}>
                <TextInput
                    style={{ height: 35, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                    editable={false}
                    value={direccionTo}
                    placeholder='Destino'
                  />
                </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>this.showModalPrecio()}>
                <View style={{flexDirection: "row", height: 35, paddingLeft:15, paddingRight: 15, zIndex:15}}>
                <View style={{flex:0.5, justifyContent: "center"}}>
                <FontAwesome name="dollar" size={25} />
                </View>
                <View style={{flex:3, justifyContent: "center"}}>
                <TextInput
                    style={{ height: 35, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                    editable={false}
                    value={precio}
                    placeholder='Ofrezca su tarifa'
                  />
                </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>this.showModalComentario()}>
                <View style={{flexDirection: "row", height: 35, paddingLeft:15, paddingRight: 15, zIndex:15}}>
                <View style={{flex:0.5, justifyContent: "center"}}>
                <Entypo name="new-message" size={25} />
                </View>
                <View style={{flex:3, justifyContent: "center"}}>
                <TextInput
                    style={{ height: 35, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                    editable={false}
                    value={comentario}
                    placeholder='Comentarios y deseos'
                  />
                </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={{margin: 10,}}>
                  <Button 
                      title="Solicitar"
                      onPress={()=>this.irarequest(direccion, direccionTo, precio, comentario, fromregion)}
                      color="#FF4119"
                    />
                </View>
            </SafeAreaView>
            <CurrentlocationButtom cb={()=>{this.centerLocation()}} />
            <ModalBusqueda modalposVisible={this.state.modalposVisible} 
                    hideModal={()=>this.hideModal()} showModalMap={()=>this.showModalMap()} 
                    dir={direccion} valorDireccion={(dir)=>this.valorDireccion(dir)}/>
            <ModalMapa modalmapVisible={this.state.modalmapVisible} hideModal={()=>this.hideModal()} 
                        centerLocation={()=>{this.centerLocation()}} region={fromregion} 
                        onRegionChange={this.onRegionChangeMap} 
                        valoresSet={(reg,dir)=>this.valoresSet(reg,dir)} />
            <ModalBusquedaTo modalposVisible={this.state.modalposToVisible} 
                    hideModal={()=>this.hideModal()} showModalMap={()=>this.showModalMapTo()} 
                    dir={direccionTo} valorDireccion={(dir)=>this.valorDireccionTo(dir)}/>
            <ModalMapaTo modalmapVisible={this.state.modalmapToVisible} hideModal={()=>this.hideModal()} 
                        centerLocation={()=>{this.centerLocation()}} region={fromregion} 
                        onRegionChange={this.onRegionChangeMapTo} 
                        valoresSet={(reg,dir)=>this.valoresSetTo(reg,dir)} />
            <ModalPrecio modalPrecioVisible={this.state.modalPrecioVisible} hideModal={()=>this.hideModal()}  
                        valorPrecio={(dir)=>this.valorPrecio(dir)} />
            <ModalComentario modalComentarioVisible={this.state.modalComentarioVisible} hideModal={()=>this.hideModal()}  
                        valorComentario={(dir)=>this.valorComentario(dir)} />
            </View>
      </SafeAreaView>

     )}
        </Drawer.Screen>
        
      </Drawer.Navigator>
    </NavigationContainer>

    )}

    {step==='request' && (
      <Solicitud byeModal={()=>this.hideModal()} borrar={()=>this.borrardatos()} showAceptado={()=>this.showAceptado()} precio={precio} />
    )}

    {step==='aceptado' && (
      <Aceptado byeModal={()=>this.hideModal()} borrar={()=>this.borrardatos()} />
    )}

    </>

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
        height: 200,
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
      markerC: {
        height: 35,
        width: 35
      },
      region: {
        color: '#000000',
        lineHeight: 20,
        margin: 20
      }
});

export default Home;