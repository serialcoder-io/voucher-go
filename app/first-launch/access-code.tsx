import ParentContainer from "@/components/parent-container";
import React, {useState} from "react";
import {View, Text, Alert} from "react-native"
import InputPassword from "@/components/ui/input-password";
import PrimaryButton from "@/components/ui/primary-button";
import {Link, useRouter} from "expo-router";
import {useTheme} from "@/hooks/useTheme";
import * as SecureStore from 'expo-secure-store';

const allDigitsSame = (accessCode: string) => {
    return accessCode.split('').every(digit => digit === accessCode[0]);
};

function AccessCode(){
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [accessCode, setAccessCode] = useState<string>("");
    const [confirmAccessCode, setConfirmAccessCode] = useState<string>("");
    const router = useRouter();
    const {theme} = useTheme();

    const handleSubmit = async() => {
        // Vérifier que le code d'accès a exactement 4 chiffres
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
        await SecureStore.setItemAsync("accessCode", accessCode);
    };

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
            <Link href="/first-launch/shop">shop</Link>
        </ParentContainer>
    )
}

export default AccessCode;