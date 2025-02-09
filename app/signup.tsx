import React, { useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Alert } from 'react-native';
import { Input, Button, Text, Icon } from '@rneui/themed';
//import { useRouter } from "expo-router";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSignup = () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Erreur", "Tous les champs sont obligatoires.");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
            return;
        }

        console.log('Utilisateur inscrit avec succès');
        // Redirection après inscription
        // router.push('/login');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <View style={styles.innerContainer}>
                {/* Logo */}
                <Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />

                {/* Titre */}
                <Text h3 style={styles.title}>Créer un compte</Text>
                <Text style={styles.subtitle}>Remplissez les informations ci-dessous</Text>

                {/* Inputs avec React Native Elements */}
                <Input
                    placeholder="Nom d'utilisateur"
                    leftIcon={{ type: 'feather', name: 'user', color: '#4c8bf5' }}
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'feather', name: 'mail', color: '#4c8bf5' }}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Mot de passe"
                    secureTextEntry={secureTextEntry}
                    leftIcon={{ type: 'feather', name: 'lock', color: '#4c8bf5' }}
                    rightIcon={
                        <Icon
                            type="feather"
                            name={secureTextEntry ? "eye-off" : "eye"}
                            color="#4c8bf5"
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    }
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirmer le mot de passe"
                    secureTextEntry={secureTextEntry}
                    leftIcon={{ type: 'feather', name: 'lock', color: '#4c8bf5' }}
                    rightIcon={
                        <Icon
                            type="feather"
                            name={secureTextEntry ? "eye-off" : "eye"}
                            color="#4c8bf5"
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    }
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Bouton */}
                <Button
                    title="Register"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.button}
                    titleStyle={{ fontWeight: '200', fontSize: 20 }}
                    containerStyle={styles.buttonContainer}
                    onPress={handleSignup}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        width: '85%',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        color: '#4c8bf5',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#4c8bf5',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    buttonContainer: {
        marginHorizontal: 50,
        height: 50,
        width: '100%',
        marginVertical: 0,
    },
    button: {
        backgroundColor: '#4c8bf5',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
    },
});

export default SignupScreen;
