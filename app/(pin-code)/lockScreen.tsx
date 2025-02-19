import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";

function PinLoginScreen() {
    const [pin, setPin] = useState(['', '', '', '']);
    const {theme} = useTheme();
    const handlePinChange = (value: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
    };
    const styles = currentstyles(theme)
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />

            {/* Title */}
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Acceder à l’application avec le code pin</Text>

            {/* Pin Inputs */}
            <View style={styles.pinContainer}>
                {pin.map((p, index) => (
                    <TextInput
                        key={index}
                        style={styles.pinInput}
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={(value) => handlePinChange(value, index)}
                        value={p}
                    />
                ))}
            </View>

            {/* Forgot Pin */}
            <TouchableOpacity>
                <Text style={styles.forgotPin}>j’ai oublié mon code pin</Text>
            </TouchableOpacity>
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
    pinInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: theme.backgroundSecondary,
        color: theme.textPrimary,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: theme.backgroundSecondary,
    },
    forgotPin: {
        fontSize: 14,
        color: theme.textPrimary,
        marginTop: 10,
    },
});

export default PinLoginScreen;
