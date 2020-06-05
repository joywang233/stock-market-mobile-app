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


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

  function Item({ id, title }) {
    const onPress = () => {
      console.log('joy');
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
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState({ /* FixMe: initial state here */ });

  // can put more code here
  const [value, onChangeText] = useState('');
  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    const url = 'http://131.181.190.87:3001/all';
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        //setRowData(result)
        //setstockData(result)

      })
      .catch(e => {
          console.log(e)
        });


  }, []);

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <View style={styles.container}>
        
      </View> */}
      <SafeAreaView style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'white', borderWidth: 1, backgroundColor: 'white' }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />

        {/* <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
          >
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet
            </Text>
          </TouchableOpacity>
        </ScrollView> */}

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
          />
        )}
        keyExtractor={item => item.id}
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