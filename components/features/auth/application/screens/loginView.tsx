import { firebaseApp } from "@/config/firebase";
import { Link, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUserContext}  from "../../../../store/useContextUser"
import { useTheme } from "@react-navigation/native";

export function LoginView() {
  const { dispatch } = useUserContext();
  const router = useRouter(); // Initialize the router for navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(firebaseApp); // Initialize the Firebase Authentication

const handleLogin = async (email:string, password:string) => {

  if (!validateFields()) return; // Validate the fields
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch({ type: "LOGIN", payload: user }); // Dispatch the user to the context
    router.push('/interfaceMenu'); 

    console.log("Logged in as: ", user.email);
    

  } catch (error) {
        console.log("Problem with the login");
        
  }
};

const validateFields = () => {
  
  switch (true) {
    case email === "" && password === "":
      setError("Rellenar todos los campos correctamente");
      return false;
    case email === "":
      setError("El campo de correo electrónico está vacío");
      return false;
    case password === "":
      setError("El campo de contraseña está vacío");
      return false;
    case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      setError("El correo electrónico no es válido");
      return false;
    default:
      setError("");
      return true;
  }
}


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
      
      <Text style={styles.textWarning}>
        {
          error
        }
        </Text>


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
    backgroundColor: "#0f0e17",
    color: "#fffffe",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fffffe",

  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#fffffe",

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
  textWarning:{
    color: "#ff0000",
    padding: 15,
    fontSize: 18,
  }
});
