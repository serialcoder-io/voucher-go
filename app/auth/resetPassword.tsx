// react/react-native
import React, { useState } from "react";
import {StyleSheet, Alert} from "react-native";
import {ALERT_TYPE} from "react-native-alert-notification";

// components
import PrimaryButton from "@/components/ui/primaryButton";
import ParentContainer from "@/components/parentContainer";
import CustomInputText from "@/components/ui/customInputText";
import {Text} from "@rneui/themed";

import {getStyles} from "@/styles/auth/resetPassword.styles"
import { validateEmail } from "@/validations/auth.validations";
import { resetPassword, signup } from "@/lib/services/auth";
import {showDialog, showToast} from "@/utils";

//hooks
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles";
import {useMutation} from "@tanstack/react-query";

import { ResetPasswordParams } from "@/types/auth.types";

const RsetPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const {theme} = useTheme();
    const styles = getStyles(theme)

    const mutation = useMutation<number, Error, ResetPasswordParams>({
        mutationFn: resetPassword,
    });

    const handleSubmit = async() => {
        const controller = new AbortController()
        const timeout = setTimeout(()=>{
            controller.abort()
        }, 30000)

        const isEmailValid = validateEmail(email, mutation.reset);
        if (!isEmailValid) {
            return;
        }
        try {
            const http_status_code = await mutation.mutateAsync({
                email,
                signal: controller.signal,
            });
            displayDialogMessage(http_status_code, mutation.reset)
        
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                const mssg = "This is taking longer than usual. " +
                "Check your connection or call assistance if the problem persists."
                showToast("Timeout", mssg, ALERT_TYPE.DANGER, theme);
            } else {
                const errMsg = "Sorry, something went wrong, please try again later";
                showDialog("Sorry", errMsg, ALERT_TYPE.DANGER, () => mutation.reset());
            }
        }finally{
            clearTimeout(timeout);
            setEmail('')
        }
        
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


const displayDialogMessage = (http_status: number, mutationReset: () => void) => {
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