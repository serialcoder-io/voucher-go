import React, { useState } from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {Text, CheckBox} from "@rneui/themed";
import {useGlobalStyles} from "@/styles/global";
import {Link, useRouter} from "expo-router";
import PrimaryButton from "@/components/ui/primary-button";
import InputPassword from "@/components/ui/input-password";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";
import {Theme} from "@/lib/definitions";

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const router = useRouter();
    const {theme} = useTheme();

    const styles = getstyles(theme)

    const handleLogin = () => {
        if (username && password) {
            console.log("Connexion réussie !");
            router.push("/(tabs)");
            setUsername('')
            setPassword('')
            return;
        } else {
            console.log("Veuillez remplir tous les champs.");
        }
    };

    return (
        <ParentContainer width='90%'>
            {/* Logo */}
            <Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />
            {/* title */}
            <Text h3 style={useGlobalStyles().title}>Welcome Back</Text>
            <Text style={{fontSize: 15, marginBottom: 20, color: theme.textSecondary}}>Login to continue</Text>

            {/* Username field */}

            <CustomInputText
                value={username}
                onChangeText={setUsername}
                iconName="user"
                placeholder="Username"
            />

            {/* Password field */}
            <InputPassword
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={password}
                onChangeText={setPassword}
            />

            {/* Options : Keep me signed in & Forgot password */}
            <View style={styles.optionsContainer}>
                <CheckBox
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    title="Keep me signed in"
                    textStyle={useGlobalStyles().textSecondary}
                    containerStyle={styles.checkboxContainer}
                    checkedColor="#4c8bf5"
                />
                <TouchableOpacity onPress={() => router.push("/reset-password")}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <PrimaryButton
                disabled={!username || !password}
                title="Login"
                loading={false}
                actionOnPress={handleLogin}
                width='95%'
            />

            <Link href='/signup' style={styles.signupText}>
                Don't have an account ?
                <Text style={{fontWeight: "bold", color: commonColors.primaryColor}}> Sign Up</Text>
            </Link>
        </ParentContainer>
    );
};

const getstyles = (theme: Theme) =>
    StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
        resizeMode: "contain",
    },
    optionsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    checkboxContainer: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    forgotPassword: {
        color: "#4c8bf5",
        fontWeight: "bold",
        fontSize: 14,
        marginRight: 10
    },
    signupText: {
        marginTop: 16,
        fontSize: 15,
        color: theme.textSecondary,
    },
});

export default LoginScreen;
