import React, { useState } from "react";
import {StyleSheet, Alert} from "react-native";
import {Text} from "@rneui/themed";
import {useGlobalStyles} from "@/styles/global";
import PrimaryButton from "@/components/ui/primary-button";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {testStringRegEx} from '@/lib/utils'

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const {theme} = useTheme();
    const styles = getstyles(theme)

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleSubmit = () => {
        if (testStringRegEx(email, regexEmail)) {
            Alert.alert("We've sent you an email. Please check your inbox");
            setEmail('')
            return;
        }
        Alert.alert("Please enter a valid email address");
    };

    return (
        <ParentContainer>
            {/* title */}
            <Text h3 style={useGlobalStyles().title}>Reset password</Text>
            <Text style={styles.subtitle}>Please provide the email address you used to create your account</Text>

            {/* Email field */}

            <CustomInputText
                value={email}
                onChangeText={setEmail}
                iconName="user"
                placeholder="Enter your email address"
            />

            <PrimaryButton
                disabled={!email}
                title="Send email"
                loading={false}
                actionOnPress={handleSubmit}
                width='95%'
            />
        </ParentContainer>
    );
};

export default LoginScreen;


const getstyles = (theme: Theme) =>
    StyleSheet.create({
    subtitle: {
        fontSize: 15,
        color: theme.textSecondary,
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
})