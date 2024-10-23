import { Link } from "expo-router";
import { Text, View} from "react-native";

export function LoginView(){

    return(
        <View>
            <input type="text" />

            <input type="text" />

            <Text>
                Implementacion de Login

            </Text>

            <Link href={"/"}>home</Link>
        </View>
    )
}