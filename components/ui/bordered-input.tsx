import {StyleSheet, TextInput} from "react-native";
import {Input} from "@rneui/themed";
import React from "react";
import {CustomInputTextProps} from "@/components/ui/custom-inputText";


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

export default BorderedInput;