import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator,  StyleSheet } from "react-native";


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
        <View style={styles.container}>
      {loaded ? (

<Text style={styles.text}>¡Carga completa!</Text>

        
      ) : (
        <ActivityIndicator size="large" color="#3d85c6" />
      )}
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

