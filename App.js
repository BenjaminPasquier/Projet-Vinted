// IMPORT DES PACKAGES
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-community/async-storage";
import Constants from "expo-constants";

// IMPORT DES ICONS ONGLETS
import { Ionicons } from "@expo/vector-icons";
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
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
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

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? (
        // SI LE TOKEN N'EST PAS ENREGISTRÉ
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
              headerBackImage: ({ color }) => (
                <AntDesign name={"arrowleft"} size={25} color={color} />
              ),
              headerBackTitle: " ",
            }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="Login"
            options={{
              headerTitle: "Se connecter",
              headerTitleAlign: "center",
              headerBackImage: ({ color }) => (
                <AntDesign name={"arrowleft"} size={25} color={color} />
              ),
              headerBackTitle: " ",
            }}
          >
            {() => <LoginScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // SI LE TOKEN EST ENREGISTRÉ
        <Stack.Navigator>
          {/* création de la tabBar */}
          <Stack.Screen
            name="tab"
            options={{
              headerStyle: {
                height: Constants.statusBarHeight,
                backgroundColor: "white",
              },
              headerTitle: false,
            }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "#4AB1BA",
                  inactiveTintColor: "#838383",
                }}
              >
                {/* 1er onglet: accueil avec les anonces  */}
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: "Fil d'actus",
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Offre"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {(props) => <OffreScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen name="Buy">
                        {(props) => <BuyScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen name="OtherProfil">
                        {(props) => <OtherProfilScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* 2e onglet: rechercher */}
                <Tab.Screen
                  name="Search"
                  options={{
                    tabBarLabel: "Chercher",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-search"} size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Chercher">
                        {(props) => <SearchScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* 3e onglet: vendre */}
                <Tab.Screen
                  name="Vendre"
                  options={{
                    tabBarLabel: "Vendre",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-add-circle-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Vendre">
                        {(props) => <VendreScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* 4e onglet: profil */}
                <Tab.Screen
                  name="Profil"
                  options={{
                    tabBarLabel: "Profil",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-person"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Profil">
                        {(props) => <ProfilScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
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
