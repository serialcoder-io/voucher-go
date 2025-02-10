import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Button, Icon, Text } from "@rneui/themed";


const ScanScreen = () => {
    const [showInput, setShowInput] = useState(false);
    const [reference, setReference] = useState("");

    const handleCheck = () => {
        console.log("Checking reference:", reference);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Bouton Scan QR */}
                <Button
                    title=" Scan QR Code"
                    icon={<Icon name="qrcode" type="font-awesome" color="black" />}
                    buttonStyle={styles.scanButton}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ color: "black" }}
                    onPress={() => console.log("Scanning QR")}
                />

                {/* Bouton pour afficher/cacher la saisie */}

                <Button
                    title={showInput ? "Hide Reference Input" : "Enter Reference Manually"}
                    buttonStyle={styles.scanButton}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{ color: "black" }}
                    onPress={() => setShowInput(!showInput)}
                />


                {/* Champ de saisie et bouton Check */}
                {showInput && (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter Reference</Text>
                        <TextInput
                            placeholder="Enter voucher ref"
                            placeholderTextColor="#666"
                            value={reference}
                            onChangeText={setReference}
                            style={styles.input}
                        />
                        <Button
                            title="Check"
                            buttonStyle={styles.checkButton}
                            titleStyle={styles.checkButtonText}
                            onPress={handleCheck}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5", // Fond clair
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    buttonContainer: {
        width: "90%",
        marginBottom: 20,
    },
    scanButton: {
        backgroundColor: "#E0E0E0", // Couleur claire
        borderRadius: 10,
        padding: 15,
    },
    toggleText: {
        color: "#333",
        fontSize: 16,
        marginBottom: 10,
        width: "100%",
        backgroundColor: "#F5F5F5",
    },
    inputContainer: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
        elevation: 2, // Ombre légère
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#F0F0F0",
        padding: 12,
        color: "#000",
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#CCC",
    },
    checkButton: {
        backgroundColor: "#4c8bf5",
        borderRadius: 5,
        padding: 12,
        width: "100%",
    },
    checkButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
});

export default ScanScreen;
