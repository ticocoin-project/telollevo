import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import Customheader from '../Customheader';

import * as firebase from "firebase";

class SerD extends  React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

    render(){
      const user = firebase.auth().currentUser;

      return (
        <SafeAreaView style={{flex: 1}}>
          <Customheader title="Quiero Ser Conductor" salir="true" byeModal={this.props.byeModal}/>
          <View style={{justifyContent:"center", flex: 1, paddingLeft: 10, }}>
          <Text>Querido,</Text>
          <Text>{user.displayName}</Text>
          <Text></Text>
          <Text>Envianos un correo a -----@----.com</Text>
          <Text></Text>
          <Text></Text>
          <Text>---->Cedula de ciudadania (parte delantera y trasera)</Text>
          <Text>---->Licencia de conduccion (parte delantera y trasera)</Text>
          <Text>---->Foto Legible del vehiculo y la placa (parte delantera y trasera)</Text>
          <Text>---->Tarjeta de propiedad del vehiculo (parte delantera y trasera)</Text>
          <Text>---->Foto para documento (cedula - DNI) 3X4 cm</Text>
          <Text>---->Selfie con el documento (cedula - DNI) y vista legible del rostro</Text>
          <Text></Text>
          <Text></Text>
          <Text>Te responderemos en un maximo de 24 Horas</Text>
          <Text>Estamos trabajando para que hagas el proceso por este medio</Text>
          </View>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SerD;