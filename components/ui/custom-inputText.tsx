import {Input} from "@rneui/themed";
import React from "react";
import {StyleSheet} from "react-native";

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
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.textInput}
            value={value}
            onChangeText={onChangeText}
        />
    );
}

export default CustomInputText;

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: "grey",
    },
    textInput: {
        fontSize: 17
    }
});