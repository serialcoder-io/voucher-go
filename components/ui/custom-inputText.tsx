import {Input} from "@rneui/themed";
import React from "react";
import { useGlobalStyles } from "@/styles/global";
import {CustomInputTextProps} from "@/lib/definitions";

function CustomInputText({
    value,
    onChangeText,
    iconName,
    placeholder,
}: CustomInputTextProps) {
    const styles = useGlobalStyles();
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

