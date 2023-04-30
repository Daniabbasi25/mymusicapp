import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
 const [data, setData]=useState([])
 const [filterdata, setFilterData]=useState([])
 const [favproduct,setFavoriteProduct]=useState([])
 const [loading, setLoading]=useState(true)
 const AddFav=async(value)=>{
  try {
    const newfav=favproduct
    
    newfav.push(value)
    setFavoriteProduct([...newfav])

   const jsonValue = JSON.stringify(newfav);
   console.log("-----------", newfav
   )
   await AsyncStorage.setItem("@Fav_Item", jsonValue);
  } catch (e) {
    // error reading value
     console.log(e.message);
  }
 }
 const DeleteFav=async(value)=>{
  try {
    const newfav = favproduct.filter((item) => item?.id != value?.id);
    setFavoriteProduct(newfav)
   const jsonValue = JSON.stringify(newfav);
   await AsyncStorage.setItem("@Fav_Item", jsonValue);
  } catch (e) {
    // error reading value
    console.log(e.message)
  }
 }
  
  const filterCat=val=>{
    let newval=val
    if(val=='Town Houses'){
      newval='tw'
    }
    else if(val=='Duplexes'){
      newval='dup'
    }
    else if(val=='Co-operative Apartments'){
      newval='ca'
    }
    else if(val=='Mobile Homes'){
      newval='mh'
    }
    else if (val == "Commercial Properties") {
      newval = "cp";
    }
    const newdata = data.filter((item) => item.c == newval);
    setFilterData(newdata)
  }
  return (
    <DataContext.Provider
      value={{
        data,
         
        loading,
        filterdata,
        filterCat,
        setFilterData,
        favproduct,
        AddFav,
        DeleteFav,
        setFavoriteProduct,
        favproduct
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default function useData() {
  return useContext(DataContext);
}
