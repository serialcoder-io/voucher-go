import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Theme} from "@/lib/definitions";
import {Input} from "@rneui/themed";
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles/global";
import {Link} from "expo-router";


function PinLoginScreen() {
    const [pin, setPin] = useState('');
    const { theme } = useTheme();

    const styles = currentstyles(theme);
    const globalStyles = useGlobalStyles();
    const handleChangePin = (pin: string) => {
        setPin(pin);
        if (pin.length === 4) {
            console.log(pin);
        }
    }

    return (
        <View style={styles.container}>
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
            <Link href="/auth" style={styles.forgotPin}>
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
