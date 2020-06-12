import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Keyboard, 
  TextInput, 
  FlatList /* include other react native components here as needed */ } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)


// flatlist items
function Item({ symbol, name, navigation, addToWatchlist}) {
  const onPress = (symbol) => {
    
    addToWatchlist(symbol);
    navigation.navigate('Stocks')
    //set to the state then pass to the context
  }
  
  return (
    <TouchableOpacity
      onPress={() => onPress(symbol)}
      style={styles.item}
    >
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}
  

export default function SearchScreen({ navigation }) {
  
  //states
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState([]);
  const [value, setText] = useState('');//for text box 

  
  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    const url = `${ServerURL}/all`;
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        //console.log(result);
        setState(result);//all data here

      })
      .catch(e => {
          console.log(e)
        });
  }, []);

    //function for change textbox 

  const allSymbols = () => {
    const copyAllSymbols = [...state];//copy all data from the state 
    // check if the search box is empty 
    if(value !== '') {
      const searched = copyAllSymbols.filter(function(items) {
        return items.symbol.includes(value.toUpperCase());
      });
      return searched;
    }

    return [
      {
        symbol: 'Please enter stock symbol',
        name: ''
      }
    ]

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.inputTxt}
          //style={{ height: 40,borderWidth: 1, borderColor: 'white',  backgroundColor: 'white' }}
          onChangeText={text => setText(text)}
          value={value}
        />
        <FlatList
          data={allSymbols()}
          renderItem={({ item }) => (
            <Item
              navigation = {navigation}
              addToWatchlist= {addToWatchlist}
              symbol={item.symbol}
              name={item.name}
            />
          )}
          keyExtractor={item => item.symbol}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  inputTxt: {
    padding: scaleSize(16),
    backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#212121',
    padding: scaleSize(16),
    marginVertical:scaleSize(8),
  },
  symbol: {
    fontSize: 20,
    height:scaleSize(20),
    color:'#FFFFFF'

  },
  name:{
    fontSize: 14,
    height:scaleSize(14),
    color:'#FFFFFF'
  },
// FixMe: add styles here ...
// use scaleSize(x) to adjust sizes for small/large screens
});