import React, { useState } from 'react';
import {StyleSheet, Image, StatusBar, Alert } from 'react-native';
import {Text} from '@rneui/themed';
import PrimaryButton from "@/components/ui/primary-button";
import InputPassword from "@/components/ui/input-password";
import {globalStyles} from "@/styles/global";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
//import { useRouter } from "expo-router";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    const allFields = [username, email, password, confirmPassword];
    const allFieldsFilled = allFields.every((field) => {
        return field.length > 0
    })
    const handleSignup = () => {
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
        <ParentContainer>
            {/* Logo */}
            <Image source={require('@/assets/images/app-img-1.png')} style={styles.logo} />

            <Text h3 style={globalStyles.title}>Create accont</Text>
            <Text style={globalStyles.subtitle}>Remplissez les informations ci-dessous</Text>

            {/* Username */}
            <CustomInputText
                value={username}
                setValue={setUsername}
                iconName="user"
                placeholder="Username"
            />

            {/* Email */}

            <CustomInputText
                value={email}
                setValue={setEmail}
                iconName="mail"
                placeholder="Email"
            />

            <InputPassword
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={password}
                onChangeText={setPassword}
            />

            <InputPassword
                placeholder="Confirme password"
                secureTextEntry={secureTextEntry}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <PrimaryButton
                disabled={!allFieldsFilled}
                title="Register"
                loading={false}
                actionOnPress={handleSignup}
            />
        </ParentContainer>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain',
    },
});

export default SignupScreen;
