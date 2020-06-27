import React, {useState} from 'react'
import { View, Text, Modal, TouchableWithoutFeedback,
    Image, TextInput, SafeAreaView, StyleSheet, FlatList,  } from 'react-native'

    const API = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?location=-72.50409999,7.90966000&f=pjson&text=';

const ModalBusquedaTo = (props) => {
    // console.log(props.dir)

    const [direc, setDir] = useState()
    // const [sugest, setSugest] = useState([])

    // console.log(sugest)

    let ponVal = (dir) => {
        // console.log(dir)
        props.valorDireccion(dir)
        props.hideModal()
        setDir()
    }

    let close = () => {
        props.hideModal()
        setDir()
    }

    // let textChange = (text) => {
    
    //     setDir(text);
        
    //     fetch(`${API + text}`)
    //       .then(res => res.json())
    //       .then((json) => {
    //         const { sugest } = json;
    //         setSugest(sugest)
    //         setDir(text)
    //       })
    //       .catch(()=>{
    //         setSugest([])
    //         setDir(text)
    //       });
     
    // }


    // let suggestionsSelected = (value) => {
    //         setDir(value),
    //         setSugest([])
    // }

    let abrirModalMap = () => {
        props.showModalMap()
        setDir()
    } 
    return(
        <Modal transparent={true}
        visible={props.modalposVisible}
        >
                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}>
                        <View style={{width: "95%", 
                                backgroundColor: "#fff",
                                borderColor: "gray",
                                borderWidth: 2,
                                top: 10,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10, 
                                flex: 1}}>

                                <View style={{flexDirection: "row", height: 35, paddingLeft:15, paddingRight: 15, zIndex:15, paddingTop: 30}}  >
                                    <View style={{flex:0.5, justifyContent: "center"}}>
                                        <Image source={require("../../assets/to.png")} style={{height:25, width: 25,}}/>
                                    </View>
                                    <View style={{flex:3, justifyContent: "center"}}  >
                                        <TextInput
                                            style={{ height: 35, borderBottomColor: 'gray', borderBottomWidth: 1 }}
                                            value={ direc ? direc : direc === "" ? "" : props.dir}
                                            autoFocus={true}
                                            onChangeText={(txt)=>setDir(txt)}
                                        />
                                    </View>
                                </View>
                            <TouchableWithoutFeedback onPress={()=>abrirModalMap()}>
                            <Text style={{color: "#FF4119", padding: 30,}} >Mostrar en el mapa</Text>
                            </TouchableWithoutFeedback>
                            <Text></Text>
                            <Text></Text>
                            {/* <FlatList
                                keyExtractor = {item => item.magicKey}
                                style={styles.autocompleteContainer}
                                data={sugest ? sugest : null}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={()=>suggestionsSelected(item.text)}>
                                    <Text style={styles.itemText}>
                                        {item.text} 
                                    </Text>
                                    </TouchableOpacity>
                                )} 
                                /> */}
                            <View style={{flex:1,}}></View>
                            <SafeAreaView style={{bottom: 0,height: 50, borderTopColor: "gray", borderTopWidth: 1}}>
                                <View style={{flexDirection: "row", height: 35, paddingLeft:15, paddingRight: 15, zIndex:15, paddingTop: 30,}}  >
                                    <View style={{flex:0.5, justifyContent: "center", paddingLeft: 10, }}>
                                        <Text onPress={()=>close()} style={{color: "#FF4119", paddingBottom: 20}}>Cerrar</Text>
                                    </View>
                                    <View style={{flex:2, justifyContent: "center"}}>
                                    </View>
                                    <View style={{flex:0.5, justifyContent: "center", paddingRight: 10,}}  >
                                        <Text style={{color: "#FF4119", paddingBottom: 20}} onPress={()=>ponVal(direc)}>Hecho</Text>
                                    </View>
                                </View>
                            </SafeAreaView>
                        </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      paddingTop: 25
    },
    autocompleteContainer: {
      marginLeft: 10,
      marginRight: 10
    },
    itemText: {
      fontSize: 15,
      margin: 2
    },
    descriptionContainer: {
      // `backgroundColor` needs to be set otherwise the
      // autocomplete input will disappear on text input.
      backgroundColor: '#F5FCFF',
      marginTop: 8
    },
    infoText: {
      textAlign: 'center'
    },
    titleText: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center'
    },
    directorText: {
      color: 'grey',
      fontSize: 12,
      marginBottom: 10,
      textAlign: 'center'
    },
    openingText: {
      textAlign: 'center'
    }
  })

export default ModalBusquedaTo;