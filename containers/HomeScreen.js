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
      <FlatList
        data={data.offers}
        numColumns={2}
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
              <View style={styles.profil}>
                <Image
                  source={
                    item.owner.account.avatar && {
                      uri: item.owner.account.avatar.secure_url,
                    }
                  }
                  style={styles.avatar}
                />
                <Text style={styles.details}>
                  {item.owner.account.username}
                </Text>
              </View>
              <View style={styles.img}>
                <Image
                  source={
                    item.product_pictures[0] && {
                      uri: item.product_pictures[0].secure_url,
                    }
                  }
                  style={styles.picture}
                />
              </View>
              <View style={styles.infos}>
                <Text style={styles.price}>{item.product_price} €</Text>
                <Text style={styles.details}>
                  {item.product_details[0].MARQUE}
                </Text>
                <Text style={styles.details}>
                  {item.product_details[1].TAILLE}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingHorizontal: 10,
  },

  annonce: {
    height: 360,
    width: 190,
    marginBottom: 10,
    marginRight: 10,
  },

  profil: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    height: 25,
    width: 25,
    borderRadius: 15,
    marginHorizontal: 7,
  },

  img: {
    height: 250,
    width: "100%",
  },

  picture: {
    flex: 1,
  },

  infos: {
    height: 70,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 10,
  },

  price: {
    fontSize: 14,
    fontWeight: "500",
  },

  details: {
    fontSize: 12,
    color: "#838383",
  },
});
