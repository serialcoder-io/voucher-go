import {View, Text, StatusBar} from "react-native";
import {Link} from "expo-router";
import React from "react";

export default function Login(){
    return (
        <View>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Text>
                Login
            </Text>
            <Link href="/">go back</Link>
            <Link href="/signup">signup</Link>
        </View>
    )
}