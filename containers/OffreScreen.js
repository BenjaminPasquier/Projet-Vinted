import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
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
    <ScrollView style={styles.global}>
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
        <View>
          <Image
            style={styles.avatar}
            source={{ uri: data.owner.account.avatar.secure_url }}
          />
        </View>
        <View>
          <Text style={styles.tallText}>{data.owner.account.username}</Text>
          <Text></Text>
        </View>
      </View>
      <View style={styles.infos}>
        <Text>{data.product_name}</Text>

        <Text style={styles.infosText}>
          {data.product_details[1].TAILLE
            ? data.product_details[1].TAILLE
            : "TAILLE UNIQUE"}{" "}
          /{" "}
          {data.product_details[1].TAILLE
            ? data.product_details[2].ÉTAT
            : data.product_details[1].ÉTAT}{" "}
          / {data.product_details[0].MARQUE}
        </Text>

        <Text style={styles.tallText}> {data.product_price} €</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.présentationText}>PRÉSENTATION DE L'ARTICLE</Text>
        <Text>{data.product_description}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ACHETER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: "white",
  },

  img: {
    height: 450,
    width: "100%",
  },

  back: {
    margin: 10,
  },

  profil: {
    height: 70,
    paddingHorizontal: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 20,
  },

  tallText: {
    fontSize: 16,
    fontWeight: "500",
  },

  infos: {
    height: 90,
    paddingHorizontal: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    justifyContent: "center",
  },

  infosText: {
    marginVertical: 5,
    color: "#838383",
  },

  description: {
    paddingHorizontal: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  présentationText: {
    marginBottom: 10,
    color: "#838383",
  },

  buttons: {
    paddingHorizontal: 10,
  },

  button: {
    height: 40,
    width: "100%",
    backgroundColor: "#4AB1BA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
