import React from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {useGlobalStyles} from "@/styles/global";

const WelcomeScreen = () => {
    const router = useRouter();
    const firstLaunch = false;
    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                if(firstLaunch){
                    router.push("/(pin-code)/pinSetup");
                }else{
                    router.push("/login");
                }
            }, 2000);

            return () => clearTimeout(timer);
        }, [router])
    );

    return (
        <View style={useGlobalStyles().container}>
            <StatusBar backgroundColor="white" barStyle="light-content" />
            <View>
                <Image
                    source={require("@/assets/images/app-img-1.png")}
                    style={styles.logo}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 20,
    },
});

export default WelcomeScreen;
