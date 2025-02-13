import {StyleSheet, TextInput} from "react-native";
import React from "react";
import {CustomInputTextProps} from "@/lib/definitions";

function BorderedInput({
   value,
   onChangeText,
   placeholder,
} : CustomInputTextProps) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#666"
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
        />
    )
}

export default BorderedInput;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        padding: 12,
        color: "#000",
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#CCC",
    },
});