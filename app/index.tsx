import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
//import { Link } from "expo-router";
import {useRouter} from "expo-router";
import PrimaryButton from "@/components/ui/primary-button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    const router = useRouter();
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
                Please press the button below to begin the setup process for the app.
            </Text>
            <PrimaryButton
                title="Get Started"
                actionOnPress={() =>router.push("/auth")}
                width='70%'
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
        width: 130,
        height: 100,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subText: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
});
