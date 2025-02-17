import {KeyboardTypeOptions, StyleSheet, TextInput} from "react-native";
import React from "react";
import {CustomInputTextProps} from "@/lib/definitions";
import {useTheme} from "@/store/theme";
import {Theme} from "@/lib/definitions";

function BorderedInput({
   value,
   onChangeText,
   placeholder,
   keyboardType = 'default',
} : CustomInputTextProps) {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#666"
            keyboardType={keyboardType as KeyboardTypeOptions}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
        />
    )
}

export default BorderedInput;

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        input: {
            backgroundColor: theme.backgroundSecondary,
            padding: 12,
            color: theme.textPrimary,
            borderRadius: 5,
            width: "100%",
            marginBottom: 10,
            borderWidth: 0.5,
            borderColor: theme.textSecondary,
        },
    });

