import { Link } from "expo-router";
import { Text, View} from "react-native";

export function NotesView(){

    return(
        <View>
            <Text>
                Implementacion de las notas
            </Text>

            <Link href={"/notes/create"}>
            Agregar nota
            </Link>
        </View>
    )
}