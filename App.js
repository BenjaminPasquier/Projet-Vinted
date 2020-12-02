// IMPORT DES PACKAGES
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";
import { AntDesign } from "@expo/vector-icons";

// IMPORT DES SCREENS
import BuyScreen from "./containers/BuyScreen";
import HomeLoginScreen from "./containers/HomeLoginScreen";
import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import OffreScreen from "./containers/OffreScreen";
import ProfilOtherScreen from "./containers/ProfilOtherScreen";
import ProfilScreen from "./containers/ProfilScreen";
import SearchScreen from "./containers/SearchScreen";
import SignUpScreen from "./containers/SignUpScreen";
import VendreScreen from "./containers/VendreScreen";

// FUNCTION
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  function LogoTitle() {
    return (
      <Image style={styles.logo} source={require("./assets/LogoVinted.png")} />
    );
  }

  const LogoBack = () => {
    return <AntDesign name="arrowleft" size={24} color="black" />;
  };

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeLogin"
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
              headerTitleAlign: "center",
            }}
          >
            {() => <HomeLoginScreen />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{
              headerTitle: "S'inscrire",
              headerTitleAlign: "center",
              headerLeft: LogoBack,
            }}
          >
            {() => <SignUpScreen />}
          </Stack.Screen>
          <Stack.Screen
            name="Login"
            options={{
              headerTitle: "Se connecter",
              headerTitleAlign: "center",
            }}
          >
            {() => <LoginScreen />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <NavigationContainer>
          <Text>Token reçu</Text>
        </NavigationContainer>
      )}
    </NavigationContainer>
  );
}

// STYLES
const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 100,
    resizeMode: "contain",
  },
});
