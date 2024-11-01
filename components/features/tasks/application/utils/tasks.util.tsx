// import { Todo } from '@/interfaces/Task';
// import { db } from '../../../../../config/firebase';
// import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

// // Function to add a todo
// export const addTodo = async (title:string) => {
//   await addDoc(collection(db, "todos"), { title, completed: false });
// };

// // Function to get all todos
// export const fetchTodos = async () => {
//   const todosSnapshot = await getDocs(collection(db, "todos"));
//   return todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };

// // Function to update a todo
// export const editTodo = async (id:any, newTitle:string) => {
//   const todoRef = doc(db, "todos", id);
//   await updateDoc(todoRef, { title: newTitle });
// };

// // Function to delete a todo
// export const deleteTodo = async (id:any) => {
//   const todoRef = doc(db, "todos", id);
//   await deleteDoc(todoRef);
// };
