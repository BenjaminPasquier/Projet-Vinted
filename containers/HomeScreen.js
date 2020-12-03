import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#4AB1BA" margin={400} />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Début FlatList</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.annonce}
              onPress={() => {
                navigation.navigate("Offre", {
                  id: item._id,
                });
              }}
            >
              <Image
                source={{ uri: item.offers[0].owner[0].account.avatar.url }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Text>Fin FlatList</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Offre");
        }}
      >
        <Text>Offre</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },

  exemple: {
    height: 300,
    width: 150,
    borderColor: "blue",
    borderWidth: 2,
  },

  annonce: {
    height: 300,
    width: 150,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "black",
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
