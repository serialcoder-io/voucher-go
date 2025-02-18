import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "@rneui/themed";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                {/* Add your logo image here */}
                <Image
                    source={require("@/assets/icons/adaptive-icon.png")}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.welcomeText}>Welcome To</Text>
            <Text style={styles.subText}>
                Create an account and access thousand of cool stuffs
            </Text>
            <Button
                title="Get Started"
                buttonStyle={styles.getStartedButton}
                titleStyle={styles.getStartedText}
                onPress={() => {}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    getStartedButton: {
        backgroundColor: "#00509E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    getStartedText: {
        fontSize: 18,
    },
    loginText: {
        marginTop: 20,
        fontSize: 14,
    },
    loginLink: {
        color: "#00509E",
        fontWeight: "bold",
    },
});
