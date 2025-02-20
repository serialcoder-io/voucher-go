import {ScrollView, View, Text} from "react-native";
import {useAuthStore} from "@/store/AuthStore";

function Account(){
    const access_token = useAuthStore.use.tokens().access
    const refresh_token = useAuthStore.use.tokens().refresh
    const trimed_token = access_token.trim().length > 0
    return (
        <ScrollView>
            <View>
                {trimed_token ? (
                    <View><Text>{access_token}</Text></View>
                ): (
                    <View><Text>access token is empty</Text></View>
                )}
                {refresh_token.trim().length > 0 ? (
                    <View><Text>{refresh_token}</Text></View>
                ): (
                    <View><Text>refresh token is empty</Text></View>
                )}
            </View>
        </ScrollView>
    )
}

export default Account