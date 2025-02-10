import {Input} from "@rneui/themed";
import React from "react";
import {StyleSheet} from "react-native";

function CustomInputText({
    value,
    setValue,
    iconName,
    placeholder,
}: {
    value: string,
    setValue: (e: string) => void
    iconName: string,
    placeholder: string,
}) {
    return (
        <Input
            placeholder={placeholder}
            leftIcon={{ type: 'feather', name: iconName, color: '#4c8bf5' }}
            inputContainerStyle={styles.inputContainer}
            value={value}
            onChangeText={setValue}
        />
    );
}

export default CustomInputText;

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: "grey",
    },
});