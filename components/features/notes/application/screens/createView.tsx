import { Link } from "expo-router";
import { Text, View} from "react-native";

export function CreateNotesView(){

    return(
        <View>
            <Text>
                Se creara una nota
            </Text>

            <Link href={"/auth/login"}>Ir al login</Link>
        </View>
    )
}