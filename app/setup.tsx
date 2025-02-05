import {View, Text} from "react-native";
import {Link} from "expo-router";

export default function Setup(){
    return (
        <View>
            <Text>
                setup
            </Text>
            <Link href="/">go back</Link>
        </View>
    )
}