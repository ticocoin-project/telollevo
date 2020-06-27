import React from 'react';
import { TouchableWithoutFeedback, FlatList, 
    StyleSheet, Text, View, TextInput,  } from 'react-native';
import data from '../../../Countries';
import { Ionicons } from '@expo/vector-icons';


export default class Selectcountry extends React.Component {

  constructor(props){
    super(props)
    this.state={
      text: "",
      datos: ""
    }
  }
    hideModal(){
        this.props.closeModal()
    }

  filter(text){
    const newData = data.filter(function(item){
        const itemData = item.name.toUpperCase()
        // const itemData1 = item.dial_code.toUpperCase()
        const texData = text.toUpperCase()
        return (itemData.indexOf(texData) > -1 )
                // itemData1.indexOf(texData) > -1)
    })
    this.setState({
      datos: newData,
      text: text,
    })
  }

  async getCountry(country) {
    const countryData = await data

    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Set data from user choice of country
      this.props.countryflag(countryCode, countryFlag)
      this.props.closeModal()
      
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    const countryData = data
    const {datos} = this.state
    if (datos === "") {
    return (
        <>
          <View style={styles.lineDivider}>
          <Ionicons name="md-search" size={32} style={styles.iconoSearch} />
            <TextInput 
                value={this.state.text}
                onChangeText={(text)=>this.filter(text)}
                style={styles.input}
                placeholder="Busca tu pais"
            />
          </View>
          <View>
          <FlatList
            data={countryData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
              ({ item }) =>
                    <TouchableWithoutFeedback 
                    onPress={() => this.getCountry(item.name) } >
                      <View style={
                            [
                              styles.countryStyle, 
                              {
                                flexDirection: 'row', 
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }
                            ]
                          }>
                        <Text style={{fontSize: 45}}>
                          {item.flag}
                        </Text>
                        <Text style={{fontSize: 20}}>
                          {item.name} ({item.dial_code})
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                }
              />
          </View>
    </>
    ) } else {
      return (
          <>
           <View style={styles.lineDivider}>
          <Ionicons name="md-search" size={32} style={styles.iconoSearch} />
            <TextInput 
                value={this.state.text}
                onChangeText={(text)=>this.filter(text)}
                style={styles.input}
                placeholder="Busca tu pais"
            />
          </View>
          <View>
          
                  <FlatList
                  keyboardShouldPersistTaps='handled'
                  data={datos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={
                    ({ item }) =>
                    <TouchableWithoutFeedback 
                    onPress={() => this.getCountry(item.name) } >
                        <View style={
                              [
                                styles.countryStyle, 
                                {
                                  flexDirection: 'row', 
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }
                              ]
                            }>
                          <Text style={{fontSize: 45}}>
                            {item.flag}
                          </Text>
                          <Text style={{fontSize: 20}}>
                            {item.name} ({item.dial_code})
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                  }
                />
               
            </View>
      </>
      
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headfoot: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countryStyle: {
    flex: 1,
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 5,
  },
  input: {
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 55,
    color: "#000",
    fontSize: 20,
    position: "relative",
  },
  iconoSearch: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 2,
    backgroundColor: "transparent",
    color: "gray",
  },
  lineDivider: {
    borderBottomColor: "#211f",
    borderBottomWidth: 1,
  }
 
});