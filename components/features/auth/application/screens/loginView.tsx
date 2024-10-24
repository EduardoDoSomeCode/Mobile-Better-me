import { firebaseApp } from "@/config/firebase";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function LoginView() {
    const router = useRouter(); // Initialize the router for navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(firebaseApp); // Initialize the Firebase Authentication

const handleLogin = async (email:string, password:string) => {

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    router.push('/notes'); 

    console.log("Logged in as: ", user.email);
  } catch (error) {
        console.log("Problem with the login");
        
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Better me</Text>
      
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

      <TouchableOpacity  onPress={()=>handleLogin(email,password)}  style={styles.button}>
    
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

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
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 24,
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
