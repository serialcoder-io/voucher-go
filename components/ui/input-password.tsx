import {Icon, Input} from "@rneui/themed";
import React from "react";
import {useGlobalStyles} from "@/styles/global";
import {InputPasswordProps} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";

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
    const {theme} = useTheme();
    return (
        <Input
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            leftIcon={{ type: 'feather', name: 'lock', color: theme.textSecondary }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.textInput}
            keyboardType={keyboardType}
            maxLength={maxLength}
            rightIcon={
                <Icon
                    type="feather"
                    name={secureTextEntry ? "eye-off" : "eye"}
                    color={theme.textPrimary}
                    onPress={onPressIcon}
                />
            }
            value={value}
            onChangeText={onChangeText}
        />
    );
}

export default InputPassword;

