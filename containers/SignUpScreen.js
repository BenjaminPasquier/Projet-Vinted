import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            {
              username,
              email,
              password,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log(response.data.token);
          if (response.data.token) {
            alert("Inscription réussie");
            setToken(response.data.token);
            await AsyncStorage.setItem("username", username);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("password", password);
          } else {
            setErrorMessage("Votre requête n'a pas abouti");
            alert("Incription ratée");
          }
        } catch {
          (error) => {
            console.log(error.message);
          };
        }
      } else {
        setErrorMessage("Mots de passe différents");
        alert("inscritpion ratée 2");
      }
    } else {
      alert("inscription ratée 3");
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.form}>
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Adresse email"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />
        <View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },

  form: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  input: {
    fontSize: 18,
    height: 50,
    marginVertical: 10,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    textAlign: "left",
  },

  errorMessage: {
    color: "red",
    marginTop: 50,
    marginBottom: 10,
    textAlign: "center",
  },

  button: {
    height: 40,
    width: "100%",
    backgroundColor: "#4AB1BA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
