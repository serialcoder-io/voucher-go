import {Input} from "@rneui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import {globalStyles} from "@/styles/global";

export type CustomInputTextProps = {
    value: string,
    onChangeText: (e: string) => void
    iconName?: string,
    placeholder: string,
}
function CustomInputText({
    value,
    onChangeText,
    iconName,
    placeholder,
}: CustomInputTextProps) {
    return (
        <Input
            placeholder={placeholder}
            leftIcon={{ type: 'feather', name: iconName, color: '#4c8bf5' }}
            inputContainerStyle={globalStyles.inputContainer}
            inputStyle={styles.textInput}
            value={value}
            onChangeText={onChangeText}
        />
    );
}

export default CustomInputText;

const styles = StyleSheet.create({
    textInput: {
        fontSize: 17
    }
});