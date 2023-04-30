import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    url: "https://picsum.photos/200",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    url: "https://picsum.photos/200",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    url: "https://picsum.photos/200",
  },
];
const FavoriteScreen = () => {
   const [search, setSearch] = useState("");
   const ItemBox = ({ name, url }) => {
     const [like, setLike] = useState(true);
     return (
       <View style={styles.box}>
         <Image source={{ uri: url }} style={styles.image} />
         <Text>{name}</Text>
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
         Favorite Song List
       </Text>
       <TextInput
         style={styles.TextField}
         placeholder="Search By Name"
         placeholderTextColor={"black"}
       />
       {/* <ItemBox name="Music Name here" url="https://picsum.photos/200" /> */}
       <FlatList
         data={DATA}
         renderItem={({ item }) => <ItemBox name={item.title} url={item.url} />}
         keyExtractor={(item) => item.id}
       />
     </View>
   );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  TextField: {
    width: wp(90),
    borderWidth: 1,
    alignSelf: "center",
    color: "#000",
    paddingLeft: 20,
  },
  box: {
    backgroundColor: "orange",
    width: wp(90),
    alignSelf: "center",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  image: {
    width: wp(20),
    height: hp(10),
    resizeMode: "cover",
    marginRight: 10,
  },
});
