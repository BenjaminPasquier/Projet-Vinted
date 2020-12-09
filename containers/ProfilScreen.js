import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfilScreen({ setToken }) {
  return (
    <View style={styles.globalView}>
      <View style={styles.imgView}>
        <ImageBackground
          style={styles.img}
          source={require("../assets/backgroundDressing.png")}
        >
          <View style={styles.pictureView}>
            <Image
              source={require("../assets/avatarVinted.png")}
              style={styles.picture}
            />
            <View style={styles.iconView}>
              <MaterialIcons name="add-a-photo" size={24} color="black" />
            </View>
          </View>
          <View style={styles.pseudoView}>
            <Text style={styles.pseudo}>Pseudo</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.infos}>
        <View>
          <Text>Email</Text>
          <TextInput placeholder="Email"></TextInput>
          <Text>Username</Text>
          <TextInput placeholder="Username"></TextInput>
          <Text>Password</Text>
          <TextInput placeholder="Password"></TextInput>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Sauvegarder les modifications</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalView: {
    flex: 1,
    backgroundColor: "white",
  },

  imgView: {
    height: 300,
    width: "100%",
  },

  img: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  infos: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },

  pictureView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 20,
    marginTop: 70,
  },

  picture: {
    height: 100,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    marginLeft: 40,
  },

  iconView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#D7D7D7",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  pseudoView: {
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    padding: 8,
  },

  pseudo: {
    color: "black",
    fontWeight: "800",
    fontSize: 22,
  },
});
