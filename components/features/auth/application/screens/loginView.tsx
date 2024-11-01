import { firebaseApp } from "@/config/firebase";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useUserContext } from "../../../../store/useContextUser";


//import logo from "@/components/logo/logo.jpeg"
export function LoginView() {
  const { dispatch } = useUserContext();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(firebaseApp);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      router.push('/notes');

      console.log("Logged in as: ", user.email);
    } catch (error) {
      console.log("Problem with the login");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../../logo/logo.jpeg")} style={styles.logo} /> {/* Usando el logo importado */}


      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      

      <Link href="/" style={styles.link}>Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#051923", 
  },
  logo: {
    width: 150, // Ajusta el ancho de la imagen
    height: 150, // Ajusta la altura de la imagen
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    color: "#007BFF",
    marginTop: 10,
  },
});
