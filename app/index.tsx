import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {Theme} from "@/lib/definitions";
import {Input} from "@rneui/themed";
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles/global";
import {Link, useRouter} from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useAuthStore} from "@/store/AuthStore";
import * as SecureStore from "expo-secure-store";
import {useShopStore} from "@/store/shop";

SplashScreen.preventAutoHideAsync();

function PinLoginScreen() {
    const [pin, setPin] = useState('');
    const { theme } = useTheme();
    const [appIsReady, setAppIsReady] = useState(false);
    const setToken = useAuthStore.use.setToken()
    const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
    const setShop = useShopStore.use.setShop();
    const router = useRouter()
    const styles = currentstyles(theme);
    const globalStyles = useGlobalStyles();



    const handleChangePin = async(pin: string) => {
        setPin(pin);
        const accesCode = await SecureStore.getItemAsync("accessCode")
        if (pin.length === 4) {
            if (pin === accesCode) {
                router.push("/auth");
            }else{
                Alert.alert("Access denied", "The access code is incorrect");
            }
        }
    }
    useEffect(() => {
        async function prepare() {
            try {
                const firstLaunch = await asyncStorage.getItem("first_launch") || "0";
                const shopJson = await asyncStorage.getItem("shop");
                if (parseInt(firstLaunch) === 0 || shopJson === null) {
                    router.push("/first-launch");
                    return
                }
                setShop(JSON.parse(shopJson));
                // if the time since the last login is less than 29 days and there are jwt stored in secure storage
                // set is authenticated to true and redirect the user to the home page
                const accessToken = await SecureStore.getItemAsync('access')
                const refreshToken = await SecureStore.getItemAsync('refresh')
                const userLastLogin = await asyncStorage.getItem("last_login")
                const lastLogin = userLastLogin ? new Date(userLastLogin) : new Date()
                const currentDate = new Date();
                const differencesInDays = (currentDate.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24)
                if (differencesInDays < 29) {
                    if (accessToken && refreshToken) {
                        setToken("access", accessToken, true)
                        setToken("refresh", refreshToken, true)
                        setIsAuthenticated(true);
                    }
                }
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            {/* Logo */}
            <Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />

            {/* Title */}
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Accéder à l’application avec le code pin</Text>

            {/* Pin Inputs */}
            <View style={styles.pinContainer}>

                <Input
                    secureTextEntry={true}
                    leftIcon={{ type: 'feather', name: 'lock', color: '#4c8bf5' }}
                    maxLength={4}
                    keyboardType="number-pad"
                    inputContainerStyle={globalStyles.inputContainer}
                    inputStyle={styles.textInput}
                    value={pin}
                    onChangeText={(value) => handleChangePin(value)}
                />

            </View>
            {/* Forgot Pin */}
            <Link href="/auth/reset-password" style={styles.forgotPin}>
                j’ai oublié mon code pin
            </Link>
        </View>
    );
}


const currentstyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: theme.textSecondary,
        marginBottom: 20,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    textInput:{
        fontSize: 25,
        color: theme.textPrimary,
        letterSpacing: 8,
        paddingLeft: 60
    },
    forgotPin: {
        fontSize: 14,
        color: theme.textPrimary,
        marginTop: 10,
    },
});

export default PinLoginScreen;
