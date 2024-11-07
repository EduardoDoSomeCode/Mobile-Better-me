import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { View,Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { Link } from "expo-router";




export default function HabitCreateScreen() {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    const [habitTitle, setHabitTitle] = useState('');
    const addHabit = async ( ) => {
        if(user){
            try {
                await addDoc(collection(db, 'habits'),{
                    uid: user.uid, // id del suuario
                    title: habitTitle,
                    days: 0,
                    createdAt: new Date(),
                }
                )
                console.log('Habit added successfully');
            } catch (error) {
                console.error('Error adding habit: ', error);
            }
        }
        
    };
    
    return(
        <View>
            <Text>Crear un nuevo habito</Text>
            
            <TextInput
            value={habitTitle}
            onChangeText={setHabitTitle}
            >

            </TextInput>

            <Button title="Guardar Habito" onPress={addHabit} />

<Link href={"/habits"}>
<Text>Volve a habitos</Text>
</Link>
        </View>
    ) 
}
