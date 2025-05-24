// react/react-native
import React, { useState } from "react";
import {StyleSheet, Alert} from "react-native";
import {ALERT_TYPE} from "react-native-alert-notification";

// components
import PrimaryButton from "@/components/ui/primary-button";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {Text} from "@rneui/themed";

// lib
import {Theme} from "@/lib/definitions";
import { validateEmail } from "./auth.validations";
import { resetPassword } from "@/lib/services/auth";
import {showDialog} from "@/lib/utils";

//hooks
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles/global";
import {useMutation} from "@tanstack/react-query";


const RsetPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const {theme} = useTheme();
    const styles = getstyles(theme)

    const mutation = useMutation<number, Error, string>({
        mutationFn: resetPassword,
    });

    const handleSubmit = async() => {
        const isEmailValid = validateEmail(email, mutation.reset);
        if (!isEmailValid) {
            return;
        }
        try {
            const http_status_code = await mutation.mutateAsync(email);
            displayDialogMessage(http_status_code, mutation.reset)
        
        } catch (error) {
            const msg = "Sorry, something went wrong, please try again later, " +
                "If the problem persists, please contact support for assistance.";
            showDialog("Error", msg, ALERT_TYPE.DANGER, () =>mutation.reset())
        }
        setEmail('')
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
                loading={mutation.isPending}
                actionOnPress={handleSubmit}
                width='95%'
            />
        </ParentContainer>
    );
};

export default RsetPasswordScreen;


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

const displayDialogMessage = async (http_status: number, mutationReset: () => void) => {
    let message = "";
    switch (http_status) {
        case 204:
            message =
                "We've sent you an email. Please check your inbox — the reset link will expire in 5 minutes. " +
                "If you don’t reset your password in time, you’ll need to request a new link.";
            showDialog('Check your inbox', message, ALERT_TYPE.INFO, mutationReset);
            break;
        case 400:
            message = "Sorry, a user with the given email does not exist.";
            showDialog('User not found', message, ALERT_TYPE.DANGER, mutationReset);
            break;
        default:
            message = "Sorry, something went wrong! Please try again later or contact support for assistance.";
            showDialog("Error", message, ALERT_TYPE.DANGER, mutationReset);
    }
};