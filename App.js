import React, {useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Login from './components/login/Login';
import RootHome from './components/RootHome';
import Nombres from './components/login/datos/Nombres';


import * as firebase from 'firebase';

firebase.initializeApp(
 
);

export default function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
    setLoading(false);
  });
  if (loading) {
    return (
      <View style={styles.container}>
          <ActivityIndicator size="large" color="#FF4119" />
          <Text>Cargando....</Text>
      </View>
    )
  }
  return (
    <>
      { !user ? (
      <Login /> )
      :
      !user.displayName ? (
      <Nombres />
      ) :
      (
      <RootHome />
      )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
