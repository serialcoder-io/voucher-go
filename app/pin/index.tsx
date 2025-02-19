import {View, Text} from "react-native";
import {Link} from "expo-router";

export default function Index(){
    return (
        <View>
            <Text>
                setup Pin code
            </Text>
            <Link href="/">go back</Link>
        </View>
    )
}