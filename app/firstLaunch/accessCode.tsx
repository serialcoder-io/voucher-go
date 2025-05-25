import ParentContainer from "@/components/parentContainer";
import React, {useState} from "react";
import {View, Text, Alert, Pressable} from "react-native"
import InputPassword from "@/components/ui/inputPassword";
import PrimaryButton from "@/components/ui/primaryButton";
import {useFocusEffect, useRouter} from "expo-router";
import {useTheme} from "@/hooks/useTheme";
import * as SecureStore from 'expo-secure-store';
import {Icon} from "@rneui/themed";
import {styles} from "@/styles/firstLaunch/accessCode.styles";
import {validateAccessCode} from "@/validations/accessCode.validations";


function AccessCode(){
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [accessCode, setAccessCode] = useState<string>("");
    const [confirmAccessCode, setConfirmAccessCode] = useState<string>("");
    const [existAccessCode, setExistAccessCode] = useState("");
    const router = useRouter();
    const {theme} = useTheme();

    const handleSubmit = async() => {
        const isAccessCodeValid = validateAccessCode(accessCode, confirmAccessCode, theme)
        if(!isAccessCodeValid){
            return
        }
        setAccessCode("");
        setConfirmAccessCode("");
        await SecureStore.setItemAsync("accessCode", accessCode);
        router.push("/firstLaunch/shop")
    };

    useFocusEffect(()=>{
        const findAccessCode = async()=>{
            const existingAccessCode = await  SecureStore.getItemAsync("accessCode") || ""
            if(existingAccessCode){
                setExistAccessCode(existingAccessCode)
            }
        }
        findAccessCode()
    })

    return (
        <ParentContainer width='90%'>
            <View style={{paddingVertical: 25, paddingHorizontal: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: 6}}>
                <Text style={{fontSize: 25, color: theme.textPrimary}}>
                    Access Code
                </Text>
                <Text style={{color: theme.textSecondary}}>
                    The access code must be a 4-digit number, different from "1234",
                    and cannot consist of the same digit repeated four times.
                </Text>
            </View>
            <InputPassword
                placeholder="Access Code"
                secureTextEntry={secureTextEntry}
                keyboardType="number-pad"
                maxLength={4}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={accessCode}
                onChangeText={setAccessCode}
            />
            <InputPassword
                placeholder="Confirm"
                secureTextEntry={secureTextEntry}
                keyboardType="number-pad"
                maxLength={4}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={confirmAccessCode}
                onChangeText={setConfirmAccessCode}
            />
            <PrimaryButton
                title="Save"
                disabled={!accessCode || !confirmAccessCode}
                actionOnPress={() =>handleSubmit()}
                width='95%'
            />
            {existAccessCode && (
                <View style={{width:'100%', padding: 10}}>
                    <Pressable style={styles.nextButton} onPress={() => router.push("/firstLaunch/shop")}>
                        <Icon
                            name="trending-flat" type='material' size={45}
                            style={styles.icon} color={theme.textSecondary}
                        />
                    </Pressable>
                </View>
            )}
        </ParentContainer>
    )
}

export default AccessCode;

