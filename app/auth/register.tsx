// react/react-native
import React, {useState} from 'react';
import {ALERT_TYPE} from "react-native-alert-notification";

// comopnents
import PrimaryButton from "@/components/ui/primaryButton";
import InputPassword from "@/components/ui/inputPassword";
import ParentContainer from "@/components/parentContainer";
import CustomInputText from "@/components/ui/customInputText";
import {Text} from '@rneui/themed';
import {showDialog} from "@/utils";
import {allRequiredFieldsFilled} from "@/validations";

// hooks
import {useGlobalStyles} from "@/styles";
import {useShopStore} from "@/store/shop";

import {Link} from "expo-router";
import {commonColors} from "@/constants/Colors";
import {validateEmail, validatePassword} from "@/validations/auth.validations";
import {signup, SignupParams, signupResponse} from "@/lib/services/auth";
import {useMutation} from "@tanstack/react-query";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const shop = useShopStore.use.shop();
    const allFields = [username, email, password, confirmPassword];

    const mutation = useMutation<signupResponse, Error, SignupParams>({
        mutationFn: signup,
    });

    const handleSignup = async () => {
        const isEmailValid = validateEmail(email, mutation.reset);
        const isPasswordValid = validatePassword(password, confirmPassword, mutation.reset);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        const company = shop?.company?.id
        if (company !== undefined) {
            try {
                const result = await mutation.mutateAsync({username, email, password, company})
                switch (result.status_code){
                    case 201:
                        const message = "Your account has been created successfully. you can now login"
                        showDialog('Registered', message, ALERT_TYPE.SUCCESS, ()=> mutation.reset())
                        break;
                    default:
                        showDialog("Sorry", result.details, ALERT_TYPE.DANGER, () =>mutation.reset())
                }
                setEmail('')
                setUsername('')
                setPassword('')
                setConfirmPassword('')
            } catch (error) {
                const msg = "Sorry, something went wrong, please try again later, " +
                    "If the problem persists, please contact support for assistance.";
                showDialog("Error", msg, ALERT_TYPE.DANGER, () =>mutation.reset())
            }
        } else {
            const msg = "No shop registered in this app. " +
                "Please log in and register your shop in the settings, " +
                "or try resetting the app by clearing its data from your phone settings," +
                " or contact support for assistance."
            const title = "Company not exist"
            showDialog(title, msg, ALERT_TYPE.DANGER, () =>mutation.reset())
            return;
        }
    };

    return (
        <ParentContainer width='90%'>
            <Text h3 style={useGlobalStyles().title}>Sign up</Text>

            <CustomInputText
                value={username}
                onChangeText={setUsername}
                iconName="user"
                placeholder="Username"
            />

            <CustomInputText
                value={email}
                onChangeText={setEmail}
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
                disabled={!allRequiredFieldsFilled(allFields)}
                title="Register"
                loading={mutation.isPending}
                actionOnPress={handleSignup}
                width='95%'
            />

            <Link href='/auth' style={{...useGlobalStyles().textSecondary, marginTop: 10, fontSize: 15}}>
                Already a member ? <Text style={{color: commonColors.primaryColor, fontWeight: 'bold'}}>Login</Text>
            </Link>
        </ParentContainer>
    );
};

export default SignupScreen;
