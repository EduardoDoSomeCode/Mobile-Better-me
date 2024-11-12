import quotesArray from "@/components/features/data/quote";
import { useUserContext } from "@/components/store/useContextUser";
import { Link } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal, TextInput, Button } from "react-native";

type Note = {
    id: string;
    title:string;
    content: string;
    uid: string; // Asegúrate de incluir otros campos que estés usando
  };
export function NotesView() {
    const [notes, setNotes] = useState<Note[]>([]);
    const db = getFirestore();
    const auth = getAuth();
    
    const { state } = useUserContext();
    const userName = state.user?.email;

    const user = userName.replace(/@[\w.]+/, "");
    console.log("User:", state.user.email);
    const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null)

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
         setQuote(quotesArray[randomIndex])
    }



    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      if (query === "") {
        fetchNotes();
      } else {
        const filteredNotes = notes.filter(note =>
          note.title.toLowerCase().includes(query.toLowerCase())
        );
        setNotes(filteredNotes);
      }
    };

    const fetchNotes = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(collection(db, "notes"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const notesData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return { id: doc.id, title:data.title, content: data.content, uid: data.uid };
          });
          setNotes(notesData);
        } catch (error) {
          console.error("Error al recuperar notas:", error);
        }
      }
    };

    
 
  
    useEffect(() => {

      fetchNotes();
      getRandomQuote();
    }, [auth.currentUser]); // Re-fetch notes if the user changes

  const [modalVisible, setModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [ error, setError] = useState("");

  const handleEdit = (id: string) => {
    const noteToEdit = notes.find(note => note.id === id);
    if (noteToEdit) {
      setCurrentNote(noteToEdit);
      setNewContent(noteToEdit.content);
      setNewTitle(noteToEdit.title);
      setModalVisible(true);
    }
  };

  const handleSave = async () => {
    if (!validateNote()) return;
    if (currentNote) {
      const updatedNote = { ...currentNote, content: newContent };
      setNotes(prevNotes => prevNotes.map(note => note.id === currentNote.id ? updatedNote : note));
      
      // Update the note in Firestore
      const noteDocRef = doc(db, "notes", currentNote.id);
      try {
        await updateDoc(noteDocRef, { content: newContent , title:newTitle} );
        console.log(`Note with id: ${currentNote.id} updated successfully`);
      } catch (error) {
        console.error("Error updating note:", error);
      }
      setModalVisible(false);
      setCurrentNote(null);
    }
  };

const validateNote = () => {
  if (newTitle === "" || newContent === "") {
    setError("El titulo y el contenido no pueden estar vacios");
    return false;
  }
  return true;
}
  const handleDelete = async (id: string) => {
    
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      console.log(`Deleted note with id: ${id}`);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };



  const renderNote = ({ item }: { item: Note }) => (
    // <Link href={`/notes/${item.id}`} asChild>
    <View style={styles.noteContainer} key={item.id}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <View>
      <Text style={styles.noteContent}>{item.content}</Text>

      </View>

<View style={styles.buttonGroupFlex}>
<TouchableOpacity 
      onPress={() => handleEdit(item.id)}
      style={styles.editButton}
       >
        <Text>Edit</Text>
      </TouchableOpacity>


      <TouchableOpacity 
      onPress={() => handleDelete(item.id)}
      style={styles.deleteButton}
       >
        <Text>Delete</Text>
      </TouchableOpacity>
  
</View>
              
      </View>
    // </Link>
  );


  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        {quote && (
          <>
            <Text>"{quote.quote}"</Text>
            <Text style={styles.quoteText}>- {quote.author}</Text>
          </>
        )}
      </View>
      <Text style={styles.header}>{user}'s Notes</Text>
 
 

      <TextInput 
        placeholder="Search notes"
        style={styles.input}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
      />
      <Link href="/notes/create" style={styles.link}>
        <Text style={styles.addNoteText}>Agregar nota</Text>
      </Link>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
       
            <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Title"
            />
            <TextInput
            style={styles.input}
            value={newContent}
            onChangeText={setNewContent}
            placeholder="Content"
            />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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

  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#fffffe",

  },
  noteContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#232946",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    display: "flex",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fffffe",

  },
  noteContent:{
    color: "#b8c1ec",
  },
  link: {
    marginTop: 20,
    alignSelf: "center",
  },
  addNoteText: {
    color: "#007BFF",
    fontSize: 16,
  },
  quoteContainer: {
    margin: 30,
    padding: 10,
    backgroundColor: "#232946",
    borderRadius: 20,
  },
  quoteText: {
    textAlign: "right",
    color: "#eebbc3",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#232946",
    width: "80%",
    color: "#fffffe",
    borderRadius:10,

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  deleteButton:{
     padding: 14,
     backgroundColor: '#fdd',
    borderRadius: 5 },
    editButton: { 
      marginRight: 8,
       padding: 14,
        backgroundColor: '#eee',
         borderRadius: 5 },

  buttonGroupFlex: { flexDirection: 'row',display:"flex", marginTop: 10,  },

});
