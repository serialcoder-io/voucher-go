import {Input} from "@rneui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import {useGlobalStyles} from "@/styles/global";
import {CustomInputTextProps} from "@/lib/definitions";

function CustomInputText({
    value,
    onChangeText,
    iconName,
    placeholder,
}: CustomInputTextProps): React.ReactElement<CustomInputTextProps> {
    return (
        <Input
            placeholder={placeholder}
            leftIcon={{ type: 'feather', name: iconName, color: '#4c8bf5' }}
            inputContainerStyle={useGlobalStyles().inputContainer}
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