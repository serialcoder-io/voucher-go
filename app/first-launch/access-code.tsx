import ParentContainer from "@/components/parent-container";
import React, {useEffect, useState} from "react";
import {View, Text, Alert, Pressable, StyleSheet} from "react-native"
import InputPassword from "@/components/ui/input-password";
import PrimaryButton from "@/components/ui/primary-button";
import {Link, useFocusEffect, useRouter} from "expo-router";
import {useTheme} from "@/hooks/useTheme";
import * as SecureStore from 'expo-secure-store';
import {Icon} from "@rneui/themed";
import {Theme} from "@/types";

const allDigitsSame = (accessCode: string) => {
    return accessCode.split('').every(digit => digit === accessCode[0]);
};

function AccessCode(){
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [accessCode, setAccessCode] = useState<string>("");
    const [confirmAccessCode, setConfirmAccessCode] = useState<string>("");
    const [existAccessCode, setExistAccessCode] = useState("");
    const router = useRouter();
    const {theme} = useTheme();

    const handleSubmit = async() => {
        if (accessCode.length !== 4 || confirmAccessCode.length !== 4) {
            Alert.alert("Invalid Access Code", "Access code must be exactly 4 digits long.");
            return;
        }
        if (accessCode !== confirmAccessCode) {
            Alert.alert("Invalid Access Code", "The access codes do not match.");
            return;
        }
        if (allDigitsSame(accessCode) || allDigitsSame(confirmAccessCode)) {
            Alert.alert("Invalid Access Code", "Access code cannot have all identical digits.");
            return;
        }
        setAccessCode("");
        setConfirmAccessCode("");
        await SecureStore.setItemAsync("accessCode", accessCode);
        router.push("/first-launch/shop")
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
                    <Pressable style={styles.nextButton} onPress={() => router.push("/first-launch/shop")}>
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

const styles =  StyleSheet.create({
    icon: {
        marginRight: 5,
    },
    nextButton: {
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "flex-end",
    }
});