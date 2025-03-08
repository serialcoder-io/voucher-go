import {Icon, Input} from "@rneui/themed";
import React from "react";
import {useGlobalStyles} from "@/styles/global";
import {InputPasswordProps} from "@/lib/definitions";

function InputPassword({
   placeholder,
   secureTextEntry,
   value,
   onChangeText,
   onPressIcon,
   keyboardType="default",
   maxLength,
}: InputPasswordProps) {
    const styles = useGlobalStyles();
    return (
        <Input
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            leftIcon={{ type: 'feather', name: 'lock', color: '#4c8bf5' }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.textInput}
            keyboardType={keyboardType}
            maxLength={maxLength}
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

