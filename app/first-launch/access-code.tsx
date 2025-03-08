import ParentContainer from "@/components/parent-container";
import React, {useState} from "react";
import {View, Text} from "react-native"
import InputPassword from "@/components/ui/input-password";
import PrimaryButton from "@/components/ui/primary-button";
import {useRouter} from "expo-router";

function AccessCode(){
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [accesCode, setAccessCode] = useState<string>("");
    const [confirmAccessCode, setConfirmAccessCode] = useState<string>("");
    const router = useRouter();
    return (
        <ParentContainer width='90%'>
            <View style={{paddingVertical: 25}}>
                <Text style={{fontSize: 30, color: "white"}}>
                    Setup
                </Text>
            </View>
            <InputPassword
                placeholder="Access Code"
                secureTextEntry={secureTextEntry}
                keyboardType="number-pad"
                maxLength={4}
                onPressIcon={() => setSecureTextEntry(!secureTextEntry)}
                value={accesCode}
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
                disabled={!accesCode || !confirmAccessCode}
                actionOnPress={() =>console.log(accesCode === confirmAccessCode)}
                width='95%'
            />
        </ParentContainer>
    )
}

export default AccessCode;