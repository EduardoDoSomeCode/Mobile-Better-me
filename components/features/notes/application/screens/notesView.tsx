import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

type Note = {
    id: string;
    content: string;
    uid: string; // Asegúrate de incluir otros campos que estés usando
  };
export function NotesView() {
    const [notes, setNotes] = useState<Note>([]);
    const db = getFirestore();
    const auth = getAuth();
  
    useEffect(() => {
      const fetchNotes = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            const q = query(collection(db, "notes"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const notesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotes(notesData);
          } catch (error) {
            console.error("Error al recuperar notas:", error);
          }
        }
      };
  
      fetchNotes();
    }, [auth.currentUser]); // Re-fetch notes if the user changes
  
    const renderNote = ({ item }) => (
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  
    const user = "Christian"; // Puedes usar el nombre real del usuario aquí.
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{user}'s Notes</Text>

        <Text>
            Algo
        </Text>


        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
        />
        <Link href="/notes/create" style={styles.link}>
          <Text style={styles.addNoteText}>Agregar nota</Text>
        </Link>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  noteContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  link: {
    marginTop: 20,
    alignSelf: "center",
  },
  addNoteText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
