import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Clasificacion extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render(){
  return (

        <View style={styles.container}>
            <Text>Clasificación</Text>
        </View>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
