import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Audio } from "expo-av";

const DetailScreen = ({navigation,route}) => {
    const {image, name, music}=route.params
      const [sound, setSound] = React.useState();
console.log(music);
     async function playSound() {
       console.log("Loading Sound");
       const { sound } = await Audio.Sound.createAsync({ uri: music });
       setSound(sound);

       console.log("Playing Sound");
       await sound.playAsync();
     }

     const stopmusic=async()=>{
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setSound(null);
        }
     }
     React.useEffect(() => {
       return sound
         ? () => {
             console.log("Unloading Sound");
             sound.unloadAsync();
           }
         : undefined;
     }, [sound]);
  return (
    <View style={{ flex: 1, backgroundColor: "orange" }}>
      {/* <Text>DetailScreen</Text> */}
      <Image source={{ uri: image }} style={styles.image} />
      <Text
        style={{
          textAlign: "center",
          marginVertical: 20,
          fontSize: 18,
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {name}
      </Text>
      <Button title={sound?'Stop': "Play"} onPress={sound?stopmusic: playSound} />
    </View>
  );
}

export default DetailScreen

const styles = StyleSheet.create({
  image:{
    width:wp(80),
    height:hp(50),
    resizeMode:'contain',
    alignSelf:'center',
    borderRadius:50,
    marginTop:10
  }
});