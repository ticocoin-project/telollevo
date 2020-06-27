import React, {useEffect, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, Button,  } from 'react-native'
import CurrentlocationButtom from '../Currentlocation'

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';

const marker = require("../../assets/userMarker.png");

const latitudeDelta = 0.0075
const longitudeDelta = 0.0075

const ModalMapaTo = (props) => {

    const [region,setRegion] = useState()
    const [direccion,setDireccion] = useState("")

    let onRegionChange = cregion => {
        
        const url = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location="+cregion.longitude+","+cregion.latitude;
        fetch(url)
        .then( res => res.json())
        .then( res => {
            // console.log(res.address.ShortLabel)
            setDireccion(res.address.ShortLabel)
        })

        setRegion(cregion)
    }

    let ponVal = (reg, dir) => {
        props.valoresSet(reg,dir)
        props.hideModal()
    }

    let centerLocation = () => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                let cregion = {
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                  };

      

                this.map.animateToRegion(cregion,1000)
            },
            (error) => console.log(error)
        )
    
    } 

    return(
        <Modal
            animationType="slide" // fade
            transparent={false}
            visible={props.modalmapVisible}>
                <View style={{flexDirection: "row", height: 50, paddingLeft:5, paddingRight: 5, borderBottomWidth:1, borderColor: "gray", zIndex:15}}>
                    <View style={{flex:0.5, justifyContent: "center"}}>
                        <TouchableOpacity onPress={props.hideModal}>
                            <Ionicons name="md-arrow-round-back" size={32} style={{textAlign: "center", color: "#FF4119"}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:2.5, justifyContent: "center"}}>
                        <Text style={{paddingLeft:15, fontSize: 20, fontWeight: "bold"}}>Atras</Text>
                    </View>
                </View>
                <View style={styles.containerpos}>
                    {props.region.latitude ? <MapView style={styles.containerpos}
                    initialRegion={{
                        latitude: props.region.latitude + 0.002058,
                        longitude: props.region.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta,
                    }}
                    onRegionChangeComplete={onRegionChange}
                    ref={(map)=>{this.map = map }}
                    rotateEnabled={false}
                    />
                    : null }
                    <View style={styles.markerFixedMap}>
                        <Image style={styles.marker} source={marker} />
                    </View>
                    <CurrentlocationButtom cb={centerLocation} bottom={250} />
                    <View style={{margin: 10,}}>
                        <Button 
                            title="Hecho"
                            onPress={()=>ponVal(region,direccion)}
                            color="#FF4119"
                            />
                    </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
      containerpos: {
        flex: 1,
      },
      markerFixedMap: {
        left: '51%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '46%'
      },
      marker: {
        height: 48,
        width: 48
      },
});

export default ModalMapaTo;