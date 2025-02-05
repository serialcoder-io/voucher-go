import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import {useRouter} from "expo-router";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const handleSignup = () => {
        // Logique d'inscription
        if (password === confirmPassword) {
            console.log('Utilisateur inscrit');
        } else {
            console.log('Les mots de passe ne correspondent pas');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <View style={styles.innerContainer}>
                {/* Logo */}
                <Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />

                {/* Titre */}
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Please fill in the details below</Text>

                {/* Inputs */}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Button */}
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleSignup}
                >
                    Sign Up
                </Button>

                {/* Lien de connexion */}
                <TouchableOpacity style={styles.loginLink} onPress={()=>{router.push("/login")}}>
                    <Text style={styles.loginText}>
                        Already have an account ?
                        <Text style={{color: '#4c8bf5', fontWeight: 'bold'}}> Log in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Fond gris clair
    },
    innerContainer: {
        width: '85%',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        elevation: 8, // Ombre subtile
        alignItems: 'center',
    },
    logo: {
        width: 120,  // Taille du logo
        height: 120, // Taille du logo
        marginBottom: 20, // Espace en dessous du logo
        resizeMode: 'contain', // Pour garder les proportions du logo
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4c8bf5', // Couleur bleue claire
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#4c8bf5',
        marginBottom: 25,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    button: {
        backgroundColor: '#4c8bf5',
        width: '100%',
        paddingVertical: 5,
        borderRadius: 10,
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#333333',
        fontSize: 14,
    },
});

export default SignupScreen;
