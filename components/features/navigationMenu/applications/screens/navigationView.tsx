import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export const NavigationView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerNotes}>
        <Link href={"/notes"}>
        <Text style={{ paddingTop: 10 }}>Notas</Text>

        </Link>
      </View>

      <View style={styles.containerTodos}>
        <Link href={"/todos"}>
        <Text>Tareas</Text>

        </Link>
      </View>

      <View style={styles.containerHabits}>
        <Link href={"/habits"}>
        <Text>Habitos</Text>

        </Link>
      </View>

      <View style={styles.containerProfile}>
        <Link href={"/profile"}>
        <Text>Perfil</Text>

        </Link>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 15,
    flex: 1,
    padding: 20,
    backgroundColor: "#0f0e17",
    color: "#fffffe",
    marginTop: 50,
    overflow: "scroll",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#b8c1ec",
  },
  habitItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
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
  containerNotes: {
    padding: 40,
    backgroundColor: "#f25f4c",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTodos: {
    padding: 40,
    backgroundColor: "#e53170",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerHabits: {
    padding: 40,
    backgroundColor: "#bae8e8",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerProfile: {
    padding: 40,
    backgroundColor: "#f25042",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
