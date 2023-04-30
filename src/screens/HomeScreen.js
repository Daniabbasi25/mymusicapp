import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AntDesign } from "@expo/vector-icons"; 


const HomeScreen = ({navigation}) => {

const [data,setData]=useState([])
const [filterdata,setFilterData]=useState([])
    const getData=async()=>{
        const url = "https://api.deezer.com/playlist/4521455722/tracks";
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "97ede18f03msheb91aacb218c416p1df811jsne293ba67c5d4",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          setData(result.data)
          setFilterData(result.data);
          
            console.log(result.data[0]);
        } catch (error) {
          console.error(error);
        }
    }
    useEffect(()=>{
        getData()
    },[])
    const [search,setSearch]=useState('')
    const handlesearch=val=>{
        if(val==''){
            setFilterData(data)
            return
        }
let newdata = data.filter((item) =>
  item?.title_short.toLowercase().includes(val?.toLowercase())
);
setFilterData(newdata)
    }
    const ItemBox = ({ name, url,music }) =>{
           const [like, setLike] = useState(false);
        return (
          <View style={styles.box}>
            <Image source={{ uri: url }} style={styles.image} />
            <TouchableOpacity
              style={{ width: "50%" }}
              onPress={() =>
                navigation.navigate(
                  "DetailScreen",
                  ({ name: name, image: url, music: music })
                )
              }
            >
              <Text>{name}</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setLike(!like)}>
              {like ? (
                <AntDesign name="heart" size={24} color="red" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              )}
            </Pressable>
          </View>
        );
};
  return (
    <View style={{ flex: 1, backgroundColor: "pink" }}>
      <Text
        style={{
          fontSize: 20,
          color: "#000",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Song List
      </Text>
      <TextInput style={styles.TextField}
      value={search}
      onChangeText={handlesearch}
       placeholder='Search By Name' 
      placeholderTextColor={'black'}/>
      {/* <ItemBox name="Music Name here" url="https://picsum.photos/200" /> */}
      <FlatList
        data={filterdata}
        renderItem={({ item }) => <ItemBox name={item?.title_short} url={item?.album?.cover_big} music={item?.preview}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  TextField: {
    width: wp(90),
    borderWidth: 1,
    alignSelf: "center",
    color: "#000",
    paddingLeft: 20,
    marginVertical:5
  },
  box: {
    backgroundColor: "orange",
    width:wp(90),
    alignSelf:'center',
    marginVertical:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:10
  },
  image:{
    width:wp(20),
    height:hp(10),
    resizeMode:'cover',
    marginRight:10
  }
});