// noinspection JSUnusedGlobalSymbols
import React, { useState } from "react";
import {StyleSheet, Alert} from "react-native";
import {Text} from "@rneui/themed";
import {globalStyles} from "@/styles/global";
//import { useRouter } from "expo-router";
import PrimaryButton from "@/components/ui/primary-button";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    //const router = useRouter();

    const handleSubmit = () => {
        const trimmedEmail = email.trim(); // Supprimer les espaces avant/après
        if (trimmedEmail && validateEmail(trimmedEmail)) {
            Alert.alert("We've sent you an email. Please check your inbox");
            setEmail('')
            return;
        }
        Alert.alert("Please enter a valid email address");
    };
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    return (
        <ParentContainer>
            {/* title */}
            <Text h3 style={globalStyles.title}>Reset password</Text>
            <Text style={styles.subtitle}>Please provide the email address you used to create your account</Text>

            {/* Email field */}

            <CustomInputText
                value={email}
                setValue={setEmail}
                iconName="user"
                placeholder="Enter your email address"
            />

            <PrimaryButton
                disabled={!email}
                title="Send email"
                loading={false}
                actionOnPress={handleSubmit}
            />
        </ParentContainer>
    );
};


export default LoginScreen;


export const styles = StyleSheet.create({

    subtitle: {
        fontSize: 15,
        color: '#444444',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
})