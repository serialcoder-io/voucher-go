import React from "react";
import {View, Image, TouchableOpacity, StyleSheet} from "react-native";
import {Text, CheckBox} from "@rneui/themed";
import {useGlobalStyles} from "@/styles";
import {Link, useRouter} from "expo-router";
import PrimaryButton from "@/components/ui/primary-button";
import InputPassword from "@/components/ui/input-password";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";
import {LoginFormProps, Theme} from "@/types";

const LoginForm = ({
   username,
   setUsername,
   password,
   setPassword,
   checked,
   setChecked,
   secureTextEntry,
   setSecureTextEntry,
   loading,
   handleSubmit,
}:LoginFormProps) => {
    const {theme} = useTheme();
    const styles = getstyles(theme)
    const router = useRouter();

    return (
        <ParentContainer width='90%'>
            {/* Logo */}
            {/*<Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />*/}
            {/* title */}
            <Text h3 style={useGlobalStyles().title}>Welcome back</Text>
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
                <TouchableOpacity onPress={() => router.push("/auth/reset-password")}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <PrimaryButton
                disabled={!username || !password}
                title="Login"
                loading={loading}
                actionOnPress={handleSubmit}
                width='95%'
            />

            <Link href='/auth/register' style={styles.signupText}>
                Don't have an account ?
                <Text style={{fontWeight: "bold", color: commonColors.primaryColor}}> Sign Up</Text>
            </Link>
        </ParentContainer>
    );
};

export default LoginForm;

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
            color: commonColors.primaryColor,
            fontWeight: "bold",
            fontSize: 14,
            marginRight: 15
        },
        signupText: {
            marginTop: 16,
            fontSize: 15,
            color: theme.textSecondary,
        },
    });
