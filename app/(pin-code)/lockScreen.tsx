import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

function PinLoginScreen() {
    const [pin, setPin] = useState(['', '', '', '']);

    const handlePinChange = (value: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
    };

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
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
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#5E5E5E',
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
        borderColor: '#D0D0D0',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: '#FFFFFF',
    },
    forgotPin: {
        fontSize: 14,
        color: '#5E5E5E',
        marginTop: 10,
    },
});

export default PinLoginScreen;
