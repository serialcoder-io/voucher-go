import React from "react";
import {View, Text, Image} from "react-native";
import {useRouter} from "expo-router";
import PrimaryButton from "@/components/ui/primaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {useTheme} from "@/hooks/useTheme";
import {getStyles} from "@/styles/firstLaunch/index.styles"

export default function WelcomeScreen() {
    const router = useRouter();
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
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
                actionOnPress={() =>router.push("/firstLaunch/accessCode")}
                width='70%'
            />
        </SafeAreaView>
    );
}



