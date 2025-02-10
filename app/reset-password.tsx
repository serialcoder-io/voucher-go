import {View, StyleSheet} from "react-native";
import {Text, Input, Button} from "@rneui/themed"
import React, {useState} from "react";

export default function ForgotPasswordScreen(){
    const [email, setEmail] = useState("");
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text>Enter your email</Text>
                <Text>Please provide the email you used when you you created your account</Text>
                <Input
                    placeholder="username"
                    leftIcon={{ type: 'feather', name: 'user', color: '#4c8bf5' }}
                    inputContainerStyle={styles.inputContainer}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Button></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    innerContainer: {
        width: "85%",
        alignItems: "center",
    },

    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: "contain",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4c8bf5",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#4c8bf5",
        marginBottom: 25,
        textAlign: "center",
        fontStyle: "italic",
    },
    inputContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: "grey",
    },
    optionsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    checkboxContainer: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    forgotPassword: {
        color: "#4c8bf5",
        fontWeight: "bold",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#4c8bf5",
        paddingVertical: 10,
        borderRadius: 10,
    }
});
