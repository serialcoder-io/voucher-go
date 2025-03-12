import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View, StatusBar, TouchableOpacity, StyleSheet, Pressable, Alert} from 'react-native';
import { Text, Icon, Card, Button, Divider } from '@rneui/themed';
import BorderedInput from "@/components/ui/bordered-input";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
import {useGlobalStyles} from "@/styles/global";
import {commonColors} from "@/constants/Colors";
import {useShopStore} from "@/store/shop";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useRouter} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {findVoucherByRef} from "@/lib/services/voucher";
import {useAuthStore} from "@/store/AuthStore";
import {queryClient} from "@/lib/queryClient";
import {useVoucherStore} from "@/store/voucher";
import InputVoucherRef from "@/components/ui/(tabs)/index/input-voucher-ref";
import CardRow from "@/components/ui/(tabs)/index/card-row";
import {isVoucherExpired, isVoucherInvalidStatus} from "@/lib/utils";

function Home() {
    const [reference, setReference] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [tillNo, setTillNo] = useState('');
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();
    const setShop = useShopStore.use.setShop()
    const accessToken = useAuthStore.use.tokens().access
    const checkStyles = getCheckStyles(theme);
    const styles = getStyles(theme);
    // If true, enables the query to find the voucher by the reference
    const [searchVoucher, setSearchVoucher] = useState(false);
    const {voucher, setVoucher} = useVoucherStore();
    const router = useRouter();
    const [isVoucherStatusValide, setIsVoucherStatusValide] = useState(false);
    const [VoucherExpired, setVoucherExpired] = useState(false);


    useEffect(() => {
        const findShop = async()=>{
            const json = await asyncStorage.getItem("shop");
            if(json !== null){
                const shop = JSON.parse(json);
                setShop(shop)
            }
        }
        findShop()
    }, [shop, setShop])

    const handleSubmitRef = () => {
        setSearchVoucher(true);
    };

    const resetState = () => {
        setVoucher([]);
        setTillNo("")
    }

    const findVoucher = useCallback(async () => {
        if(searchVoucher){
            return await findVoucherByRef(reference.trim(), accessToken.trim());
        }
        return []
    }, [reference, setReference, searchVoucher]);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["voucher"],
        queryFn: findVoucher,
        enabled: reference.length > 0 && searchVoucher,
    });

    useEffect(() => {
        if (isSuccess && data) {
            const updatedVoucher = Array.isArray(data) ? data : [data];
            setVoucher(updatedVoucher);
            if (updatedVoucher.length > 0) {
                const voucher = updatedVoucher[0];
                if (isVoucherInvalidStatus(voucher)) {
                    console.log("invalid status:" + isVoucherInvalidStatus(voucher));
                    Alert.alert(
                        "Invalid status",
                        `The status of the voucher is "${voucher.voucher_status}". It must be issued before it can be redeemed.`
                    );
                } else if (isVoucherExpired(voucher)) {
                    console.log("expired:" + isVoucherExpired(voucher));
                    Alert.alert(
                        "Expired",
                        "This voucher is already expired, please contact the distributor to extend the expiration date."
                    );
                }
            }
            const timer = setTimeout(() => {
                setSearchVoucher(false);
                setReference("")
                setShowInput(false);
                queryClient.resetQueries({ queryKey: "voucher", exact: true });
            }, 300);
            return () => clearTimeout(timer);

        }
        if (error) {
            Alert.alert("Sorry, something went wrong, please try again later");
        }
    }, [isSuccess, data, error, setSearchVoucher, queryClient]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <Card containerStyle={[styles.card, styles.storeCard]}>
                    <Text style={styles.storeName}>{shop?.company?.company_name || 'no company'}</Text>
                    <Text style={styles.storeLocation}>Location: {shop?.location || 'no shop'}</Text>
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
                            <InputVoucherRef
                                styles={checkStyles.inputContainer}
                                reference={reference}
                                setReference={setReference}
                                loading={isLoading}
                                actionOnPress={handleSubmitRef}
                            />
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

                {/* redemption card*/}
                {(
                    voucher.length > 0 &&
                    !isVoucherExpired(voucher[0]) &&
                    !isVoucherInvalidStatus(voucher[0])
                ) && (
                    <Card containerStyle={styles.card}>
                        <View style={styles.refRow}>
                            <Icon name='check-circle' type='feather' color='green' />
                            <Text style={styles.refText}>Ref: {voucher[0]?.voucher_ref}</Text>
                        </View>
                        <Divider />
                        {/*row: the amount of voucher*/}
                        <CardRow
                            iconName="money"
                            label="Amount"
                            value={voucher[0]?.amount + " Rs" || 'no amount Rs'}
                        />
                        <Divider />
                        <CardRow
                            iconName="shop"
                            label="Shop"
                            value={(shop?.company?.company_name + "  " + shop?.location) || "no shop"}
                        />
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
                            onPress={() => router.push({
                                pathname: '/redeem-voucher/[till_no]',
                                params: { till_no: tillNo }
                            })}
                        />
                        <Button
                            title='Cancel'
                            type='outline'
                            buttonStyle={styles.cancelButton}
                            titleStyle={{color: theme.textPrimary}}
                            onPress={() => resetState()}
                        />
                    </Card>
                )}
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
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 6
    },
    storeCard: {
        borderLeftWidth: 5,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftColor: commonColors.primaryColor,
        paddingVertical: 15,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 6
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
        justifyContent: 'flex-start',
        columnGap: 5,
        paddingVertical: 15,
    },
    refRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 15,
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
    rowText:{color: theme.textSecondary,},
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
        marginTop: 20,
        marginBottom: 15,
        borderColor: theme.textPrimary,
    }
});

const getCheckStyles = (theme: Theme) => {
    return StyleSheet.create({
        CheckContainer:{
            backgroundColor: theme.backgroundSecondary,
            ...useGlobalStyles().center,
            width: '100%',
            borderWidth: 0, borderRadius: 10,
            borderColor: theme.textSecondary,
            elevation: 6
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


