import {ScrollView, View, Text} from "react-native";
import {useAuthStore} from "@/store/AuthStore";
//import {useEffect} from "react";
//import {useRouter} from "expo-router";

function Profile(){
    const user = useAuthStore()    // Accède à l'utilisateur depuis Zustand

    //const router = useRouter();
    return (
        <ScrollView>
            <View>
                <Text>{JSON.stringify(user, null, 2)}</Text>
            </View>
        </ScrollView>
    )
}

export default Profile;