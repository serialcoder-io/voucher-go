import React, { useState } from 'react';
import {ScrollView, View, StatusBar, TouchableOpacity, StyleSheet, TextInput, Pressable} from 'react-native';
import { Text, Icon, Card, Button, Divider } from '@rneui/themed';
import BorderedInput from "@/components/ui/bordered-input";
import PrimaryButton from "@/components/ui/primary-button";
import {useTheme} from "@/store/theme";
import {Theme} from "@/lib/definitions";
import {useGlobalStyles} from "@/styles/global";
import {commonColors} from "@/constants/Colors";

function Home() {
    const [reference, setReference] = useState('VR-00000123/100');
    const [amount, setAmount] = useState('1000 Rs');
    const [showInput, setShowInput] = useState(false);
    const [tillNo, setTillNo] = useState('');
    const {theme} = useTheme();
    const [loading, setLoading] = useState(false);

    const handleCheck = () => {
        console.log("Checking reference:", reference);
        setReference("");
    };

    const checkStyles = getCheckStyles(theme);
    const styles = getStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <Card containerStyle={[styles.card, styles.storeCard]}>
                    <Text style={styles.storeName}>Intermart</Text>
                    <Text style={styles.storeLocation}>Location: Ebene</Text>
                </Card>

                <View style={checkStyles.CheckContainer}
                >
                    {/* check-voucher container*/}
                    <View style={checkStyles.checkVoucherConainer}>
                        {/* button to show and hide voucher reference field */}
                        <Pressable
                            onPress={() => setShowInput(!showInput)}
                            style={checkStyles.showInputRefBtn}
                            hitSlop={20}
                        >
                            <Icon
                                name={showInput ? 'chevron-down': 'chevron-right'}
                                size={25} color={theme.textPrimary} type="feather"
                            />
                            <Text style={{fontSize: 16, color: theme.textPrimary}}>Enter the reference manually</Text>
                        </Pressable>

                        {showInput && (
                            <View style={checkStyles.inputContainer}>
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
                        <TouchableOpacity style={checkStyles.scanButton}>
                            <Icon name="qrcode" size={25} color={theme.textPrimary} type="font-awesome" />
                            <Text style={{fontSize: 16, color: theme.textPrimary}}>Scan the QR code</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Card containerStyle={styles.card}>
                    <Text style={styles.refText}>Ref: {reference}</Text>
                    <View style={styles.amountRow}>
                        <Text style={styles.amountText}>Amount : {amount}</Text>
                        <Icon name='check-circle' type='feather' color='green' />
                    </View>
                    <Divider />
                    <TouchableOpacity style={styles.optionRow}>
                        <Text style={{color: theme.textPrimary}}>Select a Company</Text>
                        <Icon name='chevron-down' type='feather' color={theme.textSecondary} />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={styles.optionRow}>
                        <Text style={{color: theme.textPrimary}}>Select a location</Text>
                        <Icon name='chevron-down' type='feather' color={theme.textSecondary} />
                    </TouchableOpacity>
                    <Divider />
                    <View style={styles.optionRow}>
                        <BorderedInput
                            placeholder="Enter till no"
                            keyboardType='number-pad'
                            value={tillNo}
                            onChangeText={setTillNo}
                        />
                    </View>
                    <Button
                        title='Redeem'
                        buttonStyle={styles.redeemButton}
                        disabled={!tillNo}
                        loading={loading}
                        onPress={() => setLoading(true)}
                    />
                    <Button
                        title='Cancel'
                        type='outline'
                        buttonStyle={styles.cancelButton}
                        titleStyle={{color: commonColors.dangercolor}}
                    />
                </Card>
            </View>
        </ScrollView>
    );
}
export default Home;


const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        borderWidth: 0.3,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
    },
    storeCard: {
        borderLeftWidth: 5,
        borderRightWidth: 0.3,
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderLeftColor: commonColors.primaryColor,
        paddingVertical: 15,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
    },
    storeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    storeLocation: {
        color: theme.textSecondary,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    icon: {
        marginRight: 10,
    },
    refText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    amountText:{color: theme.textSecondary,},
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        flex: 1,
        marginLeft: 10,
    },
    redeemButton: {
        backgroundColor: commonColors.primaryColor,
        borderRadius: 5,
    },
    cancelButton: {
        borderRadius: 5,
        marginTop: 10,
        borderColor: commonColors.dangercolor,
    }
});

const getCheckStyles = (theme: Theme) => {
    return StyleSheet.create({
        CheckContainer:{
            backgroundColor: theme.backgroundSecondary,
            ...useGlobalStyles().center,
            width: '100%',
            borderWidth: 0.3, borderRadius: 10,
            borderColor: theme.textSecondary,
        },
        showInputRefBtn:{
            width:'100%',
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10
        },
        toggleText: {
            color: theme.textPrimary,
            fontSize: 16,
            marginBottom: 10,
            width: "100%",
            backgroundColor: "#ffffff",
        },
        inputContainer: {
            backgroundColor: theme.backgroundSecondary,
            width: "100%",
            alignItems: "center",
        },
        input: {
            backgroundColor: theme.backgroundSecondary,
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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 20,
            padding: 18,
        }
    })
};


