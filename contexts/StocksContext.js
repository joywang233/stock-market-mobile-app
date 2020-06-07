import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [loading, setloading] = useState(false);

  return (
    <StocksContext.Provider value={[state, setState, loading, setloading]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  
  const [state, setState, loading, setloading] = useContext(StocksContext);

  const  saveData = async (data) => {
    try {
      await AsyncStorage.setItem(
        'NEWSYMBOLS',
        JSON.stringify(data),
      );      
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const gotData = async () => {
    // set app load true
    setloading(true); 
    try {
      const value = await AsyncStorage.getItem('NEWSYMBOLS');
      if (value !== null) {
        // We have data!!
        setState(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };



  function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage

    if(!state.includes(newSymbol))
    {
      setState(state => [...state, newSymbol ]);
      saveData(state);
    }

  }

  const cleanData = async function(){
    try{

      let result = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(result);
    }catch(e){
      alert('Something is wrong!')
    }
  }

  useEffect(() => {
    // cleanData();
    // FixMe: Retrieve watchlist from persistent storage
    if(!loading){
      gotData();
    }
   
  }, []);

  return { ServerURL: 'http://131.181.190.87:3001', watchList: state,  addToWatchlist };
};
