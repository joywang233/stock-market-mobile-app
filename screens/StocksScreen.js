import React, { useState, useEffect } from 'react';
import { StyleSheet,
  SafeAreaView, 
  ScrollView, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Text, 
  View,
  FlatList,
  Dimensions/* include other react-native components here as needed */ } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import Constants from 'expo-constants';

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

// const DATA = [
//   {key: 'A'}, {key:'B'}, {key:'C'}, {key:'D'},{key:'E'},{key:'F'}

// ];



function Item({ stockData }) {

  const getPercentage = (item) => {
    const result = (item.close - item.open) / 100;
    return result.toFixed(3);
  }
  
  return (
    <TouchableOpacity
      style={styles.item}
    >
      <View style={styles.viewContainer}>
        <Text style={styles.symbol}>{stockData.symbol}</Text>
        <Text style={styles.closePrice}>{stockData.close}</Text>
        <Text style={[styles.percentageBox, { backgroundColor: getPercentage(stockData) < 0 ? '#B71C1C' : '#1B5E20' },]}>{getPercentage(stockData)}</Text>
      </View>      

    </TouchableOpacity>
  );
}

export default function StocksScreen({route}) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState([]);
  // can put more code here

  const receiveData = () => {
    if(watchList) {
      watchList.map(item=>{
        const searched = state.filter(function(stock) {
          return stock.symbol.includes(item);
        });
        if(searched.length === 0) {
          const url = `${ServerURL}/history?symbol=${item}`;
          fetch(url)
            .then(res => res.json())
            .then((result) => {
              setState(state => [ ...state, result[0]]);//stock data for the lastest date for getting the opening and closing price 
            })
            .catch(e => {
              console.log(e)
            });
        }
      });
    }
  }

  useEffect(() => {
    receiveData()
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state  
  }, [watchList]);

  

  return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={state}
          renderItem={({ item }) => (
            <Item stockData={item} />
          )}
          keyExtractor={item => item.symbol}
        />
      </SafeAreaView>  
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#212121',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  viewContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbol:{
    flex: 2,
    fontSize: 14,
    color:'#FFFFFF'

  },
  closePrice:{
    flex: 3,
    fontSize: 14,
    width: 50,
    color:'#FFFFFF'

  },
  percentageBox:{
    flex: 1,
    padding: 5,
    textAlign: 'center',
    fontSize: 14,
    color:'#FFFFFF'
  }

  // FixMe: add styles here ...
  // use scaleSize(x) to adjust sizes for small/large screens
  });