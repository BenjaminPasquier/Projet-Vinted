import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

export default function OffreScreen({ navigation, route }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(route);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${route.params.id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [route.params.id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="#4AB1BA" margin={400} />
  ) : (
    <View style={styles.global}>
      <ImageBackground
        style={styles.img}
        source={{ uri: data.product_pictures[0].secure_url }}
      >
        <AntDesign
          style={styles.back}
          name={"arrowleft"}
          size={50}
          color={"black"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ImageBackground>
      <View style={styles.profil}>
        <Text>Profil</Text>
      </View>
      <View style={styles.infos}>
        <Text>Infos</Text>
      </View>
      <View style={styles.description}>
        <Text>Descrpition</Text>
      </View>
      <View style={styles.buttons}>
        <Text>Boutons</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: "white",
  },

  img: {
    height: 500,
    width: "100%",
  },

  back: {
    margin: 10,
  },

  profil: {
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    justifyContent: "center",
  },

  infos: {
    height: 70,
    paddingHorizontal: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    justifyContent: "space-around",
  },

  description: {
    height: 100,
    paddingHorizontal: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    justifyContent: "space-around",
  },

  buttons: {
    paddingHorizontal: 10,
  },
});
