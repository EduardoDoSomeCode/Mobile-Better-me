import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";


export default  function SplashScreen(){

    //Cuando se carge validar la sesion

    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        if(loaded){
        router.replace("/auth/login")

        }
    },[loaded])

    useEffect(()=>{
        setLoaded(true)
    },[])
    return(
        <View>

            <Text>
                Load ....
            </Text>
        </View>
    )
}