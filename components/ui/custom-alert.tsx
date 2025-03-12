import {Modal, View, Text, StyleSheet, Pressable} from "react-native";
import {Icon} from "@rneui/themed";
import React from "react";

type CustomModalProps = {
    alertVisible: boolean;
    closeAlert: () => void;
    title?: string;
    message?: string;
}

function CustomAlert({ alertVisible, closeAlert, title, message }: CustomModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={alertVisible}
            onRequestClose={() => closeAlert()}
        >
            <View style={styles.overlay}>
                <View style={styles.alertView}>
                    <View style={styles.closeButtonContainer}>
                        <Pressable  hitSlop={20} onPress={() => closeAlert()}>
                            <Icon
                                name='close' type='material' size={26}
                                style={{marginRight: 10}}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.alertHeader}>
                        <Icon
                            name='cancel' type='material' color="red" size={45}
                            style={{marginRight: 10}}
                        />
                        <Text style={{fontSize: 18}}>{title}</Text>
                    </View>
                    <Text style={styles.alertText}>{message}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default CustomAlert;

const styles = StyleSheet.create({
    closeButtonContainer:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10

    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(70,70,70,0.5)',
    },
    alertHeader: {
        paddingBottom: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    alertView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    alertText: {
        marginBottom: 15,
        fontSize: 16,
    },
});

