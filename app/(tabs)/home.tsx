import React, { useState } from "react";
import {View, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import {Icon, Text} from "@rneui/themed";
import {globalStyles} from "@/styles/global";
import ParentContainer from "@/components/parent-container"
import PrimaryButton from "@/components/ui/primary-button";
import BorderedInput from "@/components/ui/bordered-input";
import CustomInputText from "@/components/ui/custom-inputText";


const ScanScreen = () => {
    const [showInput, setShowInput] = useState(false);
    const [reference, setReference] = useState("");

    const handleCheck = () => {
        console.log("Checking reference:", reference);
        setReference("");
    };

    return (
        <ParentContainer width="90%">
            <View style={styles.CheckContainer}
            >
                {/* check-voucher container*/}
                <View style={styles.checkVoucherConainer}>
                    {/* button to show and hide voucher reference field */}
                    <Pressable
                        onPress={() => setShowInput(!showInput)}
                        style={styles.showInputRefBtn}
                        hitSlop={20}
                    >
                        <Icon
                            name={showInput ? 'chevron-down': 'chevron-right'}
                            size={25} color="grey" type="feather"
                        />
                        <Text style={{fontSize: 16}}>Enter the Reference manually</Text>
                    </Pressable>

                    {showInput && (
                        <View style={styles.inputContainer}>
                            <BorderedInput
                                placeholder="Voucher Reference"
                                value={reference}
                                onChangeText={setReference}
                            />
                            <PrimaryButton
                                disabled={!reference}
                                title="Check"
                                loading={false}
                                actionOnPress={handleCheck}
                            />
                        </View>
                    )}
                </View>

                {/*scan button*/}
                <View style={{width: '100%', borderTopWidth: 0.5, borderTopColor: 'grey'}}>
                    <TouchableOpacity style={styles.scanButton}>
                        <Icon name="qrcode" size={25} color="grey" type="font-awesome" />
                        <Text style={{fontSize: 16}}>Scan the QR code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ParentContainer>
    );
};

const styles = StyleSheet.create({
    CheckContainer:{
        backgroundColor: 'white',
        ...globalStyles.center,
        width: '100%',
        borderWidth: 0.5, borderRadius: 10,
        borderColor: 'grey'
    },
    showInputRefBtn:{
        width:'100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },
    toggleText: {
        color: "#333",
        fontSize: 16,
        marginBottom: 10,
        width: "100%",
        backgroundColor: "#F5F5F5",
    },
    inputContainer: {
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
    },
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
    scanButton: {
        width:'100%', display: "flex", flexDirection: "row",
        alignItems: "center", columnGap: 15,
        paddingVertical: 15, paddingHorizontal: 18
    },
    checkVoucherConainer: {
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15,
        padding: 18,
    }
});

export default ScanScreen;
