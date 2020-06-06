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
function Item({ id, title }) {
  
  const onPress = () => {
    console.log('joy');
    //set to the state then pass to the context
  }
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        { backgroundColor: true ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
  

export default function SearchScreen({ navigation }) {
  
  // states
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState([]);
  const [value, setText] = useState('');//for text box 

  
  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    const url = 'http://131.181.190.87:3001/all';
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
        symbol: 'no reasults found',
        name: ''
      }
    ]

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'white', borderWidth: 1, backgroundColor: 'white' }}
          onChangeText={text => setText(text)}
          value={value}
        />
        <FlatList
          data={allSymbols()}
          renderItem={({ item }) => (
            <Item
              id={item.symbol}
              title={item.symbol}
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  symbol: {
    fontSize: 32,
  },
// FixMe: add styles here ...
// use scaleSize(x) to adjust sizes for small/large screens
});