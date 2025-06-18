import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ChangePasswordParams} from "@/types/auth.types";
import {Text} from "react-native";
import {useGlobalStyles} from "@/styles";
import InputPassword from "@/components/ui/inputPassword";
import PrimaryButton from "@/components/ui/primaryButton";
import {allRequiredFieldsFilled} from "@/validations";
import ParentContainer from "@/components/parentContainer";
import {updatePassword} from "@/lib/services/auth";
import {showDialog, showToast} from "@/utils";
import {ALERT_TYPE} from "react-native-alert-notification";
import {validatePassword} from "@/validations/auth.validations";
import {useAuthStore} from "@/store/AuthStore";
import {useTheme} from "@/hooks/useTheme";
import {Icon} from '@rneui/themed';
import {Theme} from "@/types";

//import {useEffect} from "react";
//import {useRouter} from "expo-router";

function ChangePassword(){
    const [oldPassword, setOldPassword] = useState('');
    const [newPpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const requiredFields = [oldPassword, newPpassword, confirmPassword];
    const accessToken = useAuthStore.use.tokens().access;
    const {theme} = useTheme()

    const mutation =
        useMutation<number, Error, {params: ChangePasswordParams, accessToken: string}>({
        mutationFn: updatePassword
    })

    const handleSubmit = async()=>{
        const controller = new AbortController();
        const timeout = setTimeout(()=>{
            controller.abort()
        }, 30000)
        let dialogtitle = ""
        let dialogMsg = ""
        if(!allRequiredFieldsFilled(requiredFields)){
            dialogtitle = "Required fields"
            dialogMsg = "Please fill all fields"
            showDialog(dialogtitle, dialogMsg, ALERT_TYPE.DANGER, () =>mutation.reset())
            return;
        }
        const isPasswordValid = validatePassword(newPpassword, confirmPassword, mutation.reset);
        if (!isPasswordValid) return;
        try{
            const params = {"old_password": oldPassword, "new_password": newPpassword, signal: controller.signal};
            const result = await mutation.mutateAsync({params: params, accessToken: accessToken});
            displayToast(result, theme);
        }catch(error){
            clearTimeout(timeout);
            if (error instanceof Error && error.name === "AbortError") {
                const mssg = "This is taking longer than usual. " +
                "Check your connection or call assistance if the problem persists."
                showToast("Timeout", mssg, ALERT_TYPE.DANGER, theme);
            } else {
                const errMsg = "Sorry, something went wrong, please try again later";
                showDialog("Sorry", errMsg, ALERT_TYPE.DANGER, () => mutation.reset());
            }
        }finally{
            setNewPassword("");
            setConfirmPassword("");
            setOldPassword("");
            mutation.reset()
            clearTimeout(timeout)
        }

    }

    //const router = useRouter();
    return (
        <ParentContainer width='90%'>
            <Icon name="key" type="feather" size={45} color={theme.textPrimary} />
            <Text style={useGlobalStyles().title}>Change password</Text>
            <InputPassword
                placeholder="Current password"
                secureTextEntry={secureTextEntry}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={oldPassword}
                onChangeText={setOldPassword}
            />

            <InputPassword
                placeholder="New password"
                secureTextEntry={secureTextEntry}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={newPpassword}
                onChangeText={setNewPassword}
            />

            <InputPassword
                placeholder="Confirm password"
                secureTextEntry={secureTextEntry}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <PrimaryButton
                disabled={!allRequiredFieldsFilled(requiredFields)}
                title="Submit"
                loading={mutation.isPending}
                actionOnPress={handleSubmit}
                width='95%'
            />

        </ParentContainer>
    )
}

export default ChangePassword;


function displayToast(statusCode: number, theme: Theme){
    let toastTitle = ""
    let toastMsg = ""
    switch (statusCode){
        case 200:
            toastTitle = "Success";
            toastMsg = "Password changed successfully"
            showToast(toastTitle, toastMsg, ALERT_TYPE.SUCCESS, theme)
            break;
        case 400:
            toastTitle = "Password incorrect";
            toastMsg = "Incorrect current password."
            showToast(toastTitle, toastMsg, ALERT_TYPE.DANGER, theme)
            break;
        default:
            toastTitle = "Error";
            toastMsg = "Sorry, something went wrong, please try again later, " +
                "If the problem persists, please contact support for assistance.";
            showToast(toastTitle, toastMsg, ALERT_TYPE.DANGER, theme)
            break;
    }
}