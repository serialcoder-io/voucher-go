import React, {useEffect, useState} from 'react';
import {ScrollView, View, StatusBar, StyleSheet, Pressable, Alert} from 'react-native';
import { Text, Icon} from '@rneui/themed';
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
import {isVoucherExpired, isVoucherInvalidStatus} from "@/lib/utils";
import CustomAlert from "@/components/ui/custom-alert";
import ScanButton from "@/components/ui/(tabs)/index/scanButton";
import ShopCard from "@/components/ui/(tabs)/index/shopCard";
import RedemptionCard from "@/components/ui/(tabs)/index/redemptionCard";
import ToogleInputRefBtn from "@/components/ui/(tabs)/index/toogleInputRefBtn";

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
    const [showCustomAlert, setShowCustomAlert] = useState(false);


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

    const closeAlert = ()=>{
        setShowCustomAlert(false)
    }

    const resetState = () => {
        setVoucher([]);
        setTillNo("")
    }

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["voucher"],
        queryFn: async () => {
            return searchVoucher ?
                await findVoucherByRef(reference.trim(), accessToken.trim()) : [];
        },
        enabled: reference.trim().length > 0 && searchVoucher,
    });

    useEffect(() => {
        if (isSuccess && data) {
            const updatedVoucher = Array.isArray(data) ? data : [data];
            setVoucher(updatedVoucher);
            if (updatedVoucher.length > 0) {
                const voucher = updatedVoucher[0];
                if (isVoucherInvalidStatus(voucher)) {
                    setShowCustomAlert(true);
                } else if (isVoucherExpired(voucher)) {
                    setShowCustomAlert(true);
                }
            }else{
                setShowCustomAlert(true);
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
                {showCustomAlert && (
                    <CustomAlert
                        alertVisible={showCustomAlert}
                        closeAlert={closeAlert}
                        title="invalid status"
                        message="invtalid voucher status"
                    />
                )}
                <ShopCard
                    companyName={shop?.company?.company_name || 'no company'}
                    shopLocation={shop?.location || 'no shop'}
                />
                <View style={checkStyles.CheckContainer}>
                    {/* check-voucher container*/}
                    <View style={checkStyles.checkVoucherConainer}>
                        {/* button to show and hide voucher reference field */}
                        <ToogleInputRefBtn
                            theme={theme}
                            showInput={showInput}
                            setShowInput={setShowInput}
                        />
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
                    <ScanButton />
                </View>

                {/* redemption card*/}
                {(
                    voucher.length > 0 &&
                    !isVoucherExpired(voucher[0]) &&
                    !isVoucherInvalidStatus(voucher[0])
                ) && (
                    <RedemptionCard
                        theme={theme}
                        voucher={voucher}
                        shop={(shop?.company?.company_name + "  " + shop?.location) || "no shop"}
                        tillNo={tillNo}
                        setTillNo={setTillNo}
                        resetState={resetState}
                    />
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
        checkVoucherConainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 20,
            padding: 18,
        }
    })
};


