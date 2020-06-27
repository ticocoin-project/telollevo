import React, {useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Login from './components/login/Login';
import RootHome from './components/RootHome';
import Nombres from './components/login/datos/Nombres';


import * as firebase from 'firebase';

firebase.initializeApp(
    {
      apiKey: "AIzaSyC0hTM_yizhadT807qQazMt8RoQAc2Ylkk",
      authDomain: "domicilios.tk",
      databaseURL: "https://motax-8c394.firebaseio.com",
      projectId: "motax-8c394",
      storageBucket: "motax-8c394.appspot.com",
      messagingSenderId: "899300749626",
      appId: "1:899300749626:web:64bfd12525b2aa2a642003",
      measurementId: "G-DDTLT1CY1Q"
    }
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
