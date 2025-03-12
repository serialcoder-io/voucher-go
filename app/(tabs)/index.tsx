import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
import {useShopStore} from "@/store/shop";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useRouter} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {findVoucherByRef} from "@/lib/services/voucher";
import {useAuthStore} from "@/store/AuthStore";
import {queryClient} from "@/lib/queryClient";
import {useVoucherStore} from "@/store/voucher";
import {isVoucherExpired, isVoucherInvalidStatus} from "@/lib/utils";
import CustomAlert from "@/components/ui/custom-alert";
import ShopCard from "@/components/ui/(tabs)/index/shopCard";
import RedemptionCard from "@/components/ui/(tabs)/index/redemptionCard";
import CheckVoucherCard from "@/components/ui/(tabs)/index/CheckVoucherCard";
import ThemedStatusBar from "@/components/status-bar";

function Home() {
    const [reference, setReference] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [tillNo, setTillNo] = useState('');
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();
    const setShop = useShopStore.use.setShop()
    const accessToken = useAuthStore.use.tokens().access
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
                <ThemedStatusBar theme={theme}/>
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
                <CheckVoucherCard
                    theme={theme}
                    showInput={showInput}
                    setShowInput={setShowInput}
                    isLoading={isLoading}
                    reference={reference}
                    setReference={setReference}
                    handleSubmitRef={handleSubmitRef}
                />
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



