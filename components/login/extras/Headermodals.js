import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Headermodals extends React.Component {
    hideModal(){
        this.props.closeModal()
    }
   render(){
       return(
        <View style={styles.container}>
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <Text >{this.props.txt}</Text>
            <Text style={styles.textoc} onPress={()=>this.hideModal()}>Cerrar</Text>
        </View>
       )
   }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      height: 70,
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 2,
      borderBottomColor: "gray",
    },
    textoc: {
        marginHorizontal: 15,
        color: "gray",
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default Headermodals