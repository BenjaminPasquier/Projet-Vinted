import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-community/async-storage";

export default function ProfilScreen({ setToken }) {
  const [newEmail, setNewEmail] = useState();
  const [newUsername, setNewUsername] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleSubmit = () => {
    alert("Vous avez bien été déconnecté");
    setToken();
  };

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
            <Text style={styles.pseudo}>PSEUDO</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.infos}>
        <View>
          <Text style={styles.inputName}>Adresse email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              setNewEmail(text);
            }}
          />
          <Text style={styles.inputName}>Nom d'utilisateur</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => {
              setNewUsername(text);
            }}
          />
          <Text style={styles.inputName}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setNewPassword(text);
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText} onpress={handleSubmit}>
              Sauvegarder les modifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSubmit}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
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
    marginTop: 80,
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
    color: "lightyellow",
    fontWeight: "800",
    fontSize: 26,
  },

  inputName: {
    marginVertical: 5,
    fontSize: 20,
    color: "grey",
  },

  input: {
    fontSize: 20,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  saveButton: {
    height: 40,
    width: "100%",
    backgroundColor: "#4AB1BA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  saveText: {
    color: "white",
    fontSize: 16,
  },

  logoutButton: {
    height: 40,
    width: "100%",
    borderColor: "#4AB1BA",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#4AB1BA",
    fontSize: 16,
  },
});
