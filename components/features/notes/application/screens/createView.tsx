import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

export function CreateNotesView() {
    const [note, setNote] = useState("");
    const db = getFirestore();
    const auth = getAuth();

  const handleSaveNote = async() => {
    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, "notes"), {
          uid: user.uid, // ID del usuario
          content: note,
          createdAt: new Date(),
        });
        console.log("Nota guardada:", note);
        setNote("");
      } catch (error) {
        console.error("Error al guardar la nota:", error);
      }
    } else {
      console.log("No hay usuario autenticado");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear una nueva nota</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nota aquí..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Guardar Nota" onPress={handleSaveNote} />
      <Link href="/notes" style={styles.notesContainer} >ver notas</Link>

      <Link href="/auth/login" style={styles.logoutConainer}>Salir de la sesion</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  notesContainer:{
    padding:10,
    borderRadius:10,
    backgroundColor:"#e3e3e3",
    color:"#000",
    margin:10,
  },
  logoutConainer:{
    color:"#d5d5d5  ",
    backgroundColor:"#990000",
    padding:10,

  }
});
