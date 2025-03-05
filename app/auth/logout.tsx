import {View} from "react-native";
import {Button} from "@rneui/themed";
import {useRouter} from "expo-router";

import React from "react";
import {useAuthStore} from "@/store/AuthStore";
function Logout(){
    const router = useRouter();
    const signOut = useAuthStore.use.signOut();
    const logout = async () => {
        signOut()
        router.push("/auth")
    }
    return (
        <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 10, paddingHorizontal: 20, paddingVertical: 20}}>
            <Button
                title="Solid"
                type="solid"
                style={{width: '100%'}}
                containerStyle={{width:'100%'}}
                buttonStyle={{borderWidth: 0, borderRadius: 10}}
                loadingProps={{size: 60, color: 'white'}}
                color="error"
                onPress={()=>logout()}
            >
                Log Out
            </Button>
        </View>
    )
}

export default Logout;