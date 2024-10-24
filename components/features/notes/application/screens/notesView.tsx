import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export function NotesView() {
  const [notes, setNotes] = useState([
    { id: '1', title: "Meeting with client", content: "Discuss project requirements." },
    { id: '2', title: "Grocery shopping", content: "Buy vegetables and fruits." },
    { id: '3', title: "Workout", content: "Leg day at the gym." },
  ]);

//   const renderNote = ({ item }) => (
//     <View style={styles.noteContainer}>
//       <Text style={styles.noteTitle}>{item.title}</Text>
//       <Text>{item.content}</Text>
//     </View>
//   );
let user = "Eduardo"
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user}'s Notes</Text>
      
        {/* <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id}
        /> */}

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
