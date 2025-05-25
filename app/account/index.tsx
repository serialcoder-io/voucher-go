// hooks
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";
import { useGlobalStyles } from "@/styles/global";
import { useTheme } from "@/hooks/useTheme";
import {useUpdateProfile} from "@/hooks/useUpdateProfile";
import { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query";


// components
import PrimaryButton from "@/components/ui/primary-button";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {Image} from "react-native";
import { requiredFieldsFilled } from "./account.validations";
import { View, Text, StyleSheet} from "react-native";
import { showToast } from "@/lib/utils";
import { ALERT_TYPE } from "react-native-alert-notification";

import { Theme } from "@/lib/definitions";


function Index() {
    const user = useAuthStore((state) => state.user);
    const setUserFields = useAuthStore((state) => state.setUserFields);
    const [currentUsername, setCurrentUsername] = useState(user?.username || "");
    const [currentEmail, setCurrentEmail] = useState(user?.email || "");
    const [firstName, setFirstName] = useState(user?.first_name || "");
    const [lastName, setLastName] = useState(user?.last_name || "");
    const {theme} = useTheme();
    const accessToken = useAuthStore.use.tokens().access;
    const mutation = useUpdateProfile()


    const updateUserStore = ()=>{
        setUserFields({"email": currentEmail, "username": currentUsername, "first_name": firstName, "last_name": lastName})
    }

    const requiredFields = [currentUsername, currentEmail];
    const handleSubmit = async()=>{
        if(!requiredFieldsFilled(requiredFields)){
            const title = "Required Fields";
            const message = "Username and email are required";
            showToast(title, message, ALERT_TYPE.DANGER, theme)
            return;
        };
        try{
            const params = {"username": currentUsername, "email": currentEmail, "first_name": firstName, "last_name": lastName}
            const result = await mutation.mutateAsync({params: params, accessToken: accessToken});
            displayToast(result, theme, updateUserStore);
        }catch{
            
        }finally{
            mutation.reset()
        }
    }

    return (
        <ParentContainer width='90%'>
            {/* user icon */}
            <View style={styles.iconContainer}>
                <Image source={require('@/assets/icons/user-icon.png')} style={styles.userIcon} />
            </View>

            <Text style={useGlobalStyles().title}>Profile</Text>

            {/* Username */}
            <CustomInputText
                value={currentUsername}
                onChangeText={setCurrentUsername}
                iconName="user"
                placeholder="Username"
            />

            {/* Email */}
            <CustomInputText
                value={currentEmail}
                onChangeText={setCurrentEmail}
                iconName="mail"
                placeholder="Email"
            />

            {/* firstname */}
            <CustomInputText
                value={firstName}
                onChangeText={setFirstName}
                iconName="user"
                placeholder="Firstname"
            />

            {/* lastname */}
            <CustomInputText
                value={lastName}
                onChangeText={setLastName}
                iconName="user"
                placeholder="lastname"
            />

            <PrimaryButton
                disabled={!requiredFieldsFilled(requiredFields)}
                title="Save"
                loading={mutation.isPending}
                actionOnPress={handleSubmit}
                width='95%'
            />
        </ParentContainer>
    );
}

export default Index;

const displayToast = (
    status_code: number, 
    theme: Theme, 
    updateUserStore: () => void 
) =>{
    let toastTitle = ""
    let toastMessage = ""
    switch(status_code){
    case 200:
        toastTitle = "Profile Updated";
        toastMessage = "Your profile has been updated successfully";
        showToast(toastTitle, toastMessage, ALERT_TYPE.SUCCESS, theme)
        updateUserStore();
        break;
    case 400:
        toastTitle = "Required fields";
        toastMessage = "Username and email are required";
        showToast(toastTitle, toastMessage, ALERT_TYPE.DANGER, theme)
        break;
    case 401:
        toastTitle = "Unauthorized";
        toastMessage = "Your session has expired. Please log in to continue.";
        showToast(toastTitle, toastMessage, ALERT_TYPE.DANGER, theme)
        break;
    default:
        toastTitle = "Unauthorized";
        toastMessage = "An unexpected error occurred. Please try again, " +
        "or contact support if the problem persists.";
        showToast(toastTitle, toastMessage, ALERT_TYPE.DANGER, theme)
}
}

const styles = StyleSheet.create({
    container: {
    paddingVertical: 20,
    gap: 15,
    },
    userIcon: {
        width: "60%",
        height: "60%",
        resizeMode: "contain",
        alignSelf: "center",
    },
    iconContainer:{
        width: 90,
        height: 90,
        borderRadius: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    }
});
