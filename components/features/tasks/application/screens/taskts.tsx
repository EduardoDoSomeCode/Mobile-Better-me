import { Todo } from '@/interfaces/Task';
import React, { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View,FlatList ,Text, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';


const TodoScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [newText, setNewText] = useState('');
  const db = getFirestore();
  const auth = getAuth();

  const user = auth.currentUser;

  useEffect(() => {
    loadTodos();
    console.log("Cargando notas");
    
  }, []);

  const loadTodos = async () => {
    if (user) {
        const q = query(
          collection(db, "todos"),
          where("uid", "==", user.uid) // Filter by the current user's ID
        );
    
        const fetchedTodos = await getDocs(q);
        const todosWithDefaults = fetchedTodos.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          priority: doc.data().priority,
          completed: doc.data().completed,
        }));
    
        setTodos(todosWithDefaults);
      } else {
        console.log("No authenticated user");
      }
  };


  const handleDelete = async (id: string) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    loadTodos();
  };

  const handleEdit = (todo:any) => {
    setCurrentTodo(todo);
    setNewText(todo.title);
    setIsEditing(true);
  };

const saveEdit = async () => {
  if (currentTodo) {
    const todoDoc = doc(db, "todos", currentTodo.id);
    await updateDoc(todoDoc, { title: newText });
    setIsEditing(false);
    setCurrentTodo(null);
    loadTodos();
  }
};

  const handleAddTodo = async () => {
    // await addTodo("New Task");
    if (user && currentTodo?.title) {
      try {
        await addDoc(collection(db, "todos"), {
          uid: user.uid,
          title: currentTodo.title,
          priority: currentTodo.priority  || "",
          completed: false,
          createdAt: new Date(),
        });
        console.log("Todo saved:", currentTodo.title);
        
        // Clear the input by resetting currentTodo
        setCurrentTodo({ ...currentTodo, title: "" });
        
        // Optionally reload todos
        loadTodos();
      } catch (error) {
        console.error("Error saving todo:", error);
      }
    } else {
      console.log("No authenticated user or empty title");
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, getPriorityStyle(item?.priority)]}>
      <Text style={styles.todoText}>{item.title}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const getPriorityStyle = (priority: string) => {
    switch (priority.toLocaleLowerCase()) {
      case "high":
        return { backgroundColor: 'red' };
      case "medium":
        return { backgroundColor: 'yellow' };
      case "low":
        return { backgroundColor: 'green' };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
   value={currentTodo?.title || ""}
   onChangeText={
    (text) => setCurrentTodo((prev) => (prev ? { ...prev, title: text } : { title: text, id: '', priority: "", completed: false }))
   }
   style={styles.input}
   placeholder="Enter todo title"
      >

      </TextInput>




      <View style={styles.container}>
      <Text>Select a Priority:</Text>
      <Picker
        selectedValue={currentTodo?.title}
        onValueChange={
          (text) => setCurrentTodo((prev) => (prev ? { ...prev, priority: text } : { title: text, id: '', priority: "", completed: false }))

        }
        style={styles.picker}
      >
        <Picker.Item label="Select priority" value="" />
        <Picker.Item label="High" value="high" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Low" value="low" />
      </Picker>
    </View>



      <Button title="Add Todo" onPress={handleAddTodo} />
      

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
      />


      <Button title="Back to notes" onPress={()=>{router.push("/notes")}} />
      <Modal visible={isEditing} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            value={newText}
            onChangeText={setNewText}
            style={styles.input}
            placeholder="Edit todo"
          />
          
          
          <Button title="Save" onPress={saveEdit} />
          {/* <Button title="Save" onPress={handleAddTodo} /> */}

          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
  todoText: { fontSize: 16 },
  buttonGroup: { flexDirection: 'row' },
  editButton: { marginRight: 8, paddingHorizontal: 8, backgroundColor: '#eee', borderRadius: 5 },
  deleteButton: { paddingHorizontal: 8, backgroundColor: '#fdd', borderRadius: 5 },
  modalContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 8, marginBottom: 12 },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
});

export default TodoScreen;
