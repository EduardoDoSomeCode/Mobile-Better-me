import { useUserContext } from '@/components/store/useContextUser';
import { Link } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// import { AreaChart, Grid } from 'react-native-svg-charts'
// import * as shape from 'd3-shape'


// import { LineChart } from 'react-native-chartjs';



  const screenWidth = Dimensions.get("window").width;



const db = getFirestore();

// Function to add a habit to Firebase
const addHabit = async (habitTitle: string, days: number) => {
    try {
        await addDoc(collection(db, 'habits'),{
            title: habitTitle,
            days: days,
            createdAt: new Date(),
        }
        )
        console.log('Habit added successfully');
    } catch (error) {
        console.error('Error adding habit: ', error);
    }
};

// Example usage
// addHabit('Exercise for 30 minutes', 1);
const data = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
  ];
// const chart = (
//     <LineChart
//       data={data}
//       width={300}
//       height={200}
//       chartConfig={{
//         backgroundColor: 'white',
//         legend: false,
//       }}
//     />
//   );

interface Habit {
    id: string;
    habit: string;
    days: number;
}
export const HabitsView = () => {
    const [habits, setHabits] = React.useState<Habit[]>([]);
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchHabits = async () => {
        if (user) {
            try {
              const q = query(collection(db, "habits"), where("uid", "==", user.uid));
              const querySnapshot = await getDocs(q);
              const habitsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { id: doc.id, habit: data.title, days: data.days, uid: data.uid };
              });
              setHabits(habitsData);
            } catch (error) {
              console.error("Error al recuperar notas:", error);
            }
          }
    }

    useEffect(() => {
        fetchHabits();
    }, [auth.currentUser]);
    return (
        <View style={styles.container}>

            

            <Link href={"/habits/create"}>
             <Text style={styles.title}>Crear habito</Text>
            
            </Link>
            <Text style={styles.title}>Your Habits</Text>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.habitItem}>
                        <Text style={styles.habitText}>{item.habit}</Text>
                    </View>
                )}
            />
            <Text style={styles.title}>Calendar</Text>
            {/* <Calendar
                style={styles.calendar}
                theme={{
                    backgroundColor: "#0f0e17",
                    calendarBackground: '#0f0e17',
                    dayTextColor: '#2d4150',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',


                }}
                // You can customize the calendar props here
                markingType={'simple'}
                markedDates={{
                    '2024-11-01': { marked: true },
                    '2024-11-02': { marked: true },
                    // Add more marked dates as needed
                }}
            /> */}


<View>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
                }}
                width={Dimensions.get("window").width - 20} // Responsive width
                height={220}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 },
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            />

<Link href={"/interfaceMenu"}>
            <Text style={styles.simpleButton}>Volver a notas</Text>
            </Link>
        </View>



{/* <View>
      {chart}
    </View> */}





        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0f0e17",
        color: "#fffffe",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"#b8c1ec"
    },
    habitItem: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2, // For Android shadow
        backgroundColor: "#0f0e17",

    },
    habitText: {
        fontSize: 18,
        color: "#fffffe",

    },
    calendar: {
        marginTop: 20,
        backgroundColor: "#0f0e17",
        color: "#fffffe",
    },
    simpleButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 20,
    }
});
