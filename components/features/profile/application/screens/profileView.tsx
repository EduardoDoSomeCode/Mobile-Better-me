import { Link } from 'expo-router';
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export function ProfileView() {
    // Sample user data
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        profilePicture: 'https://example.com/profile.jpg', // Replace with your image URL
        bio: 'Software Developer | Tech Enthusiast | Lifelong Learner'
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={styles.profilePicture}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.bio}>{user.bio}</Text>

            <Link href="/notes" style={styles.link} >
                <Text style={styles.addNoteText} >Ir a Notas</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#0f0e17",
        color: "#fffffe",
    },
    link: {
        marginTop: 20,
        alignSelf: "center",
      },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50, // Circular profile picture
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,    
        color: "#fffffe",

    },
    email: {
        fontSize: 16,
        color: '#b8c1ec', // Gray color for email
        marginBottom: 10,

    },
    bio: {
        fontSize: 14,
        textAlign: 'center',
        color: '#495057', // Dark gray color for bio
    },
    addNoteText: {
        color: "#007BFF",
        fontSize: 16,
      },
});
