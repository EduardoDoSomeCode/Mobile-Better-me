//bu
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type NoteScreenRouteProp = RouteProp<{ params: { note: { title: string; content: string } } }, 'params'>;

const NoteScreen = ({ route }: { route: NoteScreenRouteProp }) => {
    const { note } = route.params;

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>{note.title}</Text> */}
            <Text style={styles.content}>{note.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
});

export default NoteScreen;