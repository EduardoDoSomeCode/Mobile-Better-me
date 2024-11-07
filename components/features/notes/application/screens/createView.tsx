import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";



export function CreateNotesView() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

    const db = getFirestore();

  const handleSaveNote = async() => {
    if (user) {
      try {
        await addDoc(collection(db, "notes"), {
          uid: user.uid, // id del suuario
          title:title,
          content: note, // contenido de la nota
          createdAt: new Date(), // añadir fecha de creacion 
        });
        setNote("");
        setTitle("");
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
      value={title}
      placeholder={"Título de la nota"}
      onChangeText={setTitle}
      />
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
    backgroundColor: "#0f0e17",
    color: "#fffffe",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fffffe",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: "#fffffe",
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



// title: {
//   fontSize: 24,
//   marginBottom: 20,
//   color: "#fffffe",

// },

// header: {
//   fontSize: 24,
//   marginBottom: 20,
//   textAlign: "center",
//   color: "#fffffe",

// },
// noteContainer: {
//   padding: 15,
//   marginBottom: 15,
//   backgroundColor: "#232946",
//   borderRadius: 5,
//   shadowColor: "#000",
//   shadowOpacity: 0.1,
//   shadowOffset: { width: 0, height: 2 },
//   shadowRadius: 4,
//   elevation: 3,
//   display: "flex",
// },
// noteTitle: {
//   fontSize: 18,
//   fontWeight: "bold",
//   marginBottom: 5,
//   color: "#fffffe",

// },
// noteContent:{
//   color: "#b8c1ec",
// },