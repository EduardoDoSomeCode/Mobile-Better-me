import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';

// import { AreaChart, Grid } from 'react-native-svg-charts'
// import * as shape from 'd3-shape'


// import { LineChart } from 'react-native-chartjs';


  const screenWidth = Dimensions.get("window").width;

// Sample habits data
const habitsData = [
    { id: '1', habit: 'Exercise for 30 minutes' },
    { id: '2', habit: 'Read 20 pages of a book' },
    { id: '3', habit: 'Meditate for 10 minutes' },
    { id: '4', habit: 'Drink 2 liters of water' },
];
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
export const HabitsView = () => {
    return (
        <View style={styles.container}>

            <Link href={"/notes"}>
            <Text style={styles.title}>Volver a notas</Text>
            </Link>
            <Text style={styles.title}>Your Habits</Text>
            <FlatList
                data={habitsData}
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
});
