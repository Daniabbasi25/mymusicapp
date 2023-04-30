import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './src/screens/HomeScreen';
const Stack = createNativeStackNavigator();
import { AntDesign } from "@expo/vector-icons"; 
import FavoriteScreen from './src/screens/FavoriteScreen';
import { Entypo } from "@expo/vector-icons";
import DetailScreen from './src/screens/DetailScreen';
import { DataProvider } from './src/hooks/useData';
export default function App() {
  // const navigation=useNavigation()
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: "Songs",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Favorite")}
                >
                  <AntDesign name="heart" size={24} color="red" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={({ navigation }) => ({
              headerTitle: "Favorite Screen",
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Entypo name="home" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={({ navigation }) => ({
              headerTitle: "Detail Screen",
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Entypo name="home" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
          {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

