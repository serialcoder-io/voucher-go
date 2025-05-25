// hooks
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";
import { useGlobalStyles } from "@/styles";
import { useTheme } from "@/hooks/useTheme";
import {useUpdateProfile} from "@/hooks/useUpdateProfile";

// components
import PrimaryButton from "@/components/ui/primaryButton";
import ParentContainer from "@/components/parentContainer";
import CustomInputText from "@/components/ui/customInputText";
import {Image} from "react-native";
import { View, Text } from "react-native";

import {allRequiredFieldsFilled} from "@/validations";
import { showToast } from "@/utils";
import { ALERT_TYPE } from "react-native-alert-notification";
import {styles} from "@/styles/account"
import {displayToast} from "@/utils/acount.utils";


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
        if(!allRequiredFieldsFilled(requiredFields)){
            const title = "Required Fields";
            const message = "Username and email are required";
            showToast(title, message, ALERT_TYPE.DANGER, theme)
            return;
        }
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
                disabled={!allRequiredFieldsFilled(requiredFields)}
                title="Save"
                loading={mutation.isPending}
                actionOnPress={handleSubmit}
                width='95%'
            />
        </ParentContainer>
    );
}

export default Index;
