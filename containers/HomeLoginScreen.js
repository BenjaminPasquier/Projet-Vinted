import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeLoginScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.intro}>
        <View style={styles.imageView}>
          <View>
            <View style={styles.whiteGap1} />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo1.png")}
            />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo8.png")}
            />
          </View>
          <View>
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo2.png")}
            />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo7.png")}
            />
          </View>
          <View>
            <View style={styles.whiteGap3} />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo3.png")}
            />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo6.png")}
            />
          </View>
          <View>
            <View style={styles.whiteGap2} />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo4.png")}
            />
            <Image
              style={styles.img}
              source={require("../assets/imgLoginHome/photo5.png")}
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>
            {" "}
            Vends sans frais ce que tu ne portes plus.
          </Text>
          <Text style={styles.title}> Rejoins nous !</Text>
        </View>
      </View>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          style={styles.signUp}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.signUpText}>S'inscrire sur Vinted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.loginText}>J'ai déjà un compte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  intro: {
    height: 440,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  imageView: {
    width: "100%",
    paddingHorizontal: 25,
    height: 300,
    flexDirection: "row",
  },

  whiteGap1: {
    width: 90,
    height: 40,
  },

  whiteGap2: {
    height: 20,
    width: 90,
  },

  whiteGap3: {
    height: 60,
    width: 90,
  },

  img: {
    height: 120,
    width: 90,
    resizeMode: "contain",
  },

  title: {
    fontSize: 28,
    textAlign: "center",
  },

  buttonsView: {
    width: "100%",
    paddingHorizontal: 25,
  },

  signUp: {
    height: 40,
    width: "100%",
    backgroundColor: "#4AB1BA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  signUpText: {
    fontSize: 16,
    color: "white",
  },

  login: {
    height: 40,
    width: "100%",
    borderColor: "#4AB1BA",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    fontSize: 16,
    color: "#4AB1BA",
  },
});
