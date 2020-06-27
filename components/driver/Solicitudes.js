import React from 'react';
import { StyleSheet, View, FlatList, } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail, Text, } from 'native-base';

const urlImageP = require("../../assets/perfil.jpg");

export default class Solicitudes extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render(){
  return (

        <View style={styles.container}>
            <Text>Aqui podrian salir solicitudes que no fueron tomadas</Text>
            <ListItem key={1} avatar>
              <Left>
                <Thumbnail source={urlImageP}/>
              </Left>
              <Body>
                <Text>Nombres y apellidos</Text>
                <Text>Destino</Text>
              </Body>
              <Right>
              <Text>$$ Precio</Text>
              </Right>
            </ListItem>
        </View>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
