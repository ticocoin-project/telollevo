import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default class Terms extends React.Component {
  render() {
    return (
        <>
        <View style={styles.headfoot}>
          <Text></Text>
          <Text style={styles.headtitle}>Términos y Condiciones</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Hello!</Text>
        </View>
        </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF4119',
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  headfoot: {
    alignItems: 'center',
  },
  botontitle: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
  foottitle: {
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    color: "gray",
  },
  headtitle: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});