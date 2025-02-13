import {Icon, Input} from "@rneui/themed";
import React from "react";
import {globalStyles} from "@/styles/global";

function InputPassword({
   placeholder,
   secureTextEntry,
   value,
   onChangeText,
   onPressIcon,
}: {
    placeholder: string;
    secureTextEntry: boolean;
    value: string;
    onChangeText: (e: string) => void;
    onPressIcon: () => void;
}) {
    return (
        <Input
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            leftIcon={{ type: 'feather', name: 'lock', color: '#4c8bf5' }}
            inputContainerStyle={globalStyles.inputContainer}
            rightIcon={
                <Icon
                    type="feather"
                    name={secureTextEntry ? "eye-off" : "eye"}
                    color="#4c8bf5"
                    onPress={onPressIcon}
                />
            }
            value={value}
            onChangeText={onChangeText}
        />
    );
}

export default InputPassword;

