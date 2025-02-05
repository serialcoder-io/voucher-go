import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";

const WelcomeScreen = () => {
    const router = useRouter();
    const firstLaunch = false;
    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                if(firstLaunch){
                    router.push("/setup");
                }else{
                    router.push("/login");
                }
            }, 3000);

            return () => clearTimeout(timer);
        }, [router])
    );

    return (
        <View style={styles.container}>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 20,
    },
});

export default WelcomeScreen;
