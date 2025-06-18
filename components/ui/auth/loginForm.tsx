import React from "react";
import {View, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar} from "react-native";
import {Text, CheckBox} from "@rneui/themed";
import {useGlobalStyles} from "@/styles";
import {Link, useRouter} from "expo-router";
import InputPassword from "@/components/ui/inputPassword";
import CustomInputText from "@/components/ui/customInputText";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";
import {LoginFormProps, Theme} from "@/types";
import {LinearGradient} from 'expo-linear-gradient';
import GradientButton from "./gradientButton";

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
}: LoginFormProps) => {
    const {theme} = useTheme();
    const styles = getstyles(theme);
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={commonColors.primaryColor}
            />
            {/* Dégradé haut avec message */}
            <LinearGradient
                colors={[commonColors.primaryColor, '#772bc2']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Hello</Text>
                <Text style={styles.headerSubtitle}>Sign in!</Text>
            </LinearGradient>

            {/* Form Card */}
            <View style={styles.card}>
                <CustomInputText
                    value={username}
                    onChangeText={setUsername}
                    iconName="user"
                    placeholder="Username"
                />

                <InputPassword
                    placeholder="Password"
                    secureTextEntry={secureTextEntry}
                    onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.optionsContainer}>
                    <CheckBox
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        title="Keep me login"
                        textStyle={styles.checkboxText}
                        containerStyle={styles.checkboxContainer}
                        checkedColor="#4c8bf5"
                    />
                    <TouchableOpacity onPress={() => router.push("/auth/resetPassword")}>
                        <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                <GradientButton
                    disabled={!username || !password}
                    title="SIGN IN"
                    loading={loading}
                    onPress={handleSubmit}                   
                    gradientColors={[commonColors.primaryColor, '#772bc2']}
                />

                <View style={styles.signupContainer}>
                    <Text style={styles.signupTextStatic}>Don’t have an account?</Text>
                    <Link href='/auth/register'>
                        <Text style={styles.signupText}> Sign Up</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginForm;


const getstyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f6f6f6',
        },
        header: {
            height: 230,
            paddingTop: 60,
            paddingHorizontal: 25,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
        },
        headerTitle: {
            color: '#fff',
            fontSize: 32,
            fontWeight: 'bold',
        },
        headerSubtitle: {
            color: '#fff',
            fontSize: 22,
            marginTop: 5,
        },
        card: {
            backgroundColor: '#fff',
            marginHorizontal: 16,
            padding: 25,
            borderRadius: 20,
            marginTop: -40,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 5,
            elevation: 5,
        },
        optionsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            marginTop: -10,
        },
        checkboxContainer: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 0,
            marginLeft: 0,
        },
        checkboxText: {
            color: theme.textSecondary,
        },
        forgotPassword: {
            color: commonColors.primaryColor,
            fontWeight: 'bold',
            fontSize: 14,
        },
        button: {
            marginTop: 10,
            borderRadius: 30,
        },
        signupContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 25,
        },
        signupTextStatic: {
            color: '#888',
            fontSize: 15,
        },
        signupText: {
            color: commonColors.primaryColor,
            fontWeight: 'bold',
            fontSize: 15,
        },
    });
