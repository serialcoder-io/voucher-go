import {StyleSheet, TextInput} from "react-native";
import React from "react";
import {CustomInputTextProps} from "@/types";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/types";

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
            keyboardType={keyboardType}
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
            fontSize: 16,
            color: theme.textPrimary,
            borderRadius: 5,
            width: "100%",
            marginBottom: 10,
            borderWidth: 0.1,
            borderColor: theme.textSecondary,
            elevation: 8,
        },
    });

