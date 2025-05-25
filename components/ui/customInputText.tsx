import {Input} from "@rneui/themed";
import React from "react";
import { useGlobalStyles } from "@/styles";
import {CustomInputTextProps} from "@/types";
import {useTheme} from "@/hooks/useTheme";

function CustomInputText({
    value,
    onChangeText,
    iconName,
    placeholder,
}: CustomInputTextProps) {
    const styles = useGlobalStyles();
    const {theme} = useTheme();
    return (
        <Input
            placeholder={placeholder}
            leftIcon={{ type: 'feather', name: iconName, color: theme.textSecondary }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.textInput}
            value={value}
            onChangeText={onChangeText}
        />
    );
}

export default CustomInputText;

