import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image } from 'react-native';
import {Input} from "@rneui/themed";
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles";
import {Link, useRouter} from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useAuthStore} from "@/store/AuthStore";
import * as SecureStore from "expo-secure-store";
import {useShopStore} from "@/store/shop";
import {getHomeScreenStyles} from "@/styles";
import {showToast} from "@/utils";
import {ALERT_TYPE} from "react-native-alert-notification";

SplashScreen.preventAutoHideAsync();

function PinLoginScreen() {
    const [pin, setPin] = useState('');
    const { theme } = useTheme();
    const [appIsReady, setAppIsReady] = useState(false);
    const setToken = useAuthStore.use.setToken()
    const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
    const setShop = useShopStore.use.setShop();
    const router = useRouter()
    const styles = getHomeScreenStyles(theme);
    const globalStyles = useGlobalStyles();

    const handleChangePin = async(pin: string) => {
        setPin(pin);
        const accesCode = await SecureStore.getItemAsync("accessCode")
        if (pin.length === 4) {
            if (pin === accesCode) {
                router.push("/auth");
            }else{
                const title = "Access denied";
                const message = "The access code is incorrect";
                showToast(title, message, ALERT_TYPE.DANGER, theme)
            }
        }
    }
    useEffect(() => {
        async function prepare() {
            try {
                const firstLaunch = await asyncStorage.getItem("first_launch") || "0";
                const shopJson = await asyncStorage.getItem("shop");
                if (parseInt(firstLaunch) === 0 || shopJson === null) {
                    router.push("/firstLaunch");
                    return
                }
                setShop(JSON.parse(shopJson));
                // if the time since the last login is less than 7 days and there are jwt stored in secure storage
                // set is authenticated to true and redirect the user to the home page
                const accessToken = await SecureStore.getItemAsync('access')
                const refreshToken = await SecureStore.getItemAsync('refresh')
                const userLastLogin = await asyncStorage.getItem("last_login")
                const lastLogin = userLastLogin ? new Date(userLastLogin) : new Date()
                const currentDate = new Date();
                const differencesInDays = (currentDate.getTime() - lastLogin.getTime()) / (1000 * 3600 * 24)
                if (differencesInDays < 7) {
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
            {/*<Link href="/auth/resetPassword" style={styles.forgotPin}>
                j’ai oublié mon code pin
            </Link>*/}
        </View>
    );
}

export default PinLoginScreen;
