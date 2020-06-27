import React, { useState } from 'react'
import { SafeAreaView, View, Image, Text, ScrollView, TouchableOpacity, } from 'react-native'
import * as firebase from "firebase";

import { Ionicons, FontAwesome } from '@expo/vector-icons';

// import { DrawerItem, DrawerItemList } from '@react-navigation/drawer';

const urlImageP = require("../assets/perfil.jpg");

function CustomMenuD (props) {

    function ira(){

      props.cU()
      setTimeout(()=>props.cClient(),5)
 
    }

    function iraP(){
      // props.navigation.push("Perfil")
      // props.navigation.closeDrawer();
    }

    const user = firebase.auth().currentUser;
    // const [focusHome, setFocusHome] = useState(true);
    // const [focusHistorial, setFocusHistorial] = useState(false);
    // const [focusConfig, setFocusConfig] = useState(false);
    // const [focusHelp, setFocusHelp] = useState(false);
  
    return(
      <SafeAreaView style={{flex:1, top: 15}}>
          <TouchableOpacity onPress={iraP}  style={{height: 80, paddingLeft:15, flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1}}>
            {user.photoURL ? 
            <View style={{flex:1.5, justifyContent: "center"}}>
              <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={{uri: user.photoURL}}  />
            </View>
            :
            <View style={{flex:1.5, justifyContent: "center"}}>
              <Image style={{height: 60, width:60, borderRadius: 70, borderWidth: 2, borderColor: "#FF4119"}} source={urlImageP}  />
            </View>
            }
            <View style={{flex:2.5, justifyContent: "center", paddingLeft: 35 }}>
              <Text style={{fontSize: 20}}>{user.displayName}</Text>
            </View>
            <View style={{flex:1, justifyContent: "center", alignItems: "flex-end", paddingRight:15}}>
            <FontAwesome name="angle-right" style={{ color: "#FF4119", fontSize: 40}} />
            </View>
          </TouchableOpacity>
        <ScrollView style={{marginLeft:5}}>
        {/* <DrawerItemList
            {...props}
          /> */}
        </ScrollView>
        <View style={{ padding: 20, borderTopColor: "gray", borderTopWidth: 1, Bottom: 10}} >
            <TouchableOpacity onPress={ira} style={{ padding: 10, alignItems: "center", justifyContent: "center", borderRadius:20, backgroundColor: "#FF4119", marginBottom: 10}}>
              <Text style={{ fontSize: 20, color: "white", }}>Modo Cliente</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  export default CustomMenuD;