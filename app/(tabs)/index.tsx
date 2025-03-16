import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
import {useShopStore} from "@/store/shop";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useFocusEffect, useRouter} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {findVoucherByRef} from "@/lib/services/voucher";
import {useAuthStore} from "@/store/AuthStore";
import {queryClient} from "@/lib/queryClient";
import ShopCard from "@/components/ui/(tabs)/index/shopCard";
import RedemptionCard from "@/components/ui/(tabs)/index/redemptionCard";
import CheckVoucherCard from "@/components/ui/(tabs)/index/CheckVoucherCard";
import ThemedStatusBar from "@/components/status-bar";
import CustomConfirmationModal from "@/components/ui/customConfirmationModal";
import VoucherNotFoundCard from "@/components/ui/(tabs)/index/voucherNotFoundCard";
import {useVoucherStore} from "@/store/voucher";

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
    //const [voucher, setVoucher] = useState<Voucher[] | []>([]);
    const {voucher, setVoucher} = useVoucherStore();
    const [showRedemptionCard, setShowRedemptionCard] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [notFoundMsg, setNotFoundMsg ] = useState(false);
    const router = useRouter();

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
        setNotFoundMsg(false);
        setShowRedemptionCard(false);
        setVoucher([]);
        setTimeout(() => {
            setSearchVoucher(true);
            setShowInput(false);
        }, 300);
    };

    const resetState = () => {
        setVoucher([]);
        setShowRedemptionCard(false)
        setShowConfirm(false);
        setNotFoundMsg(false)
        setSearchVoucher(false);
        setTillNo("")
    }

    useFocusEffect(
        React.useCallback(() => {
            resetState()
        }, [])
    );

    const { data, isLoading, isSuccess, error, isPending, isFetching } = useQuery({
        queryKey: ["voucher"],
        queryFn: async () => {
            return searchVoucher ?
                await findVoucherByRef(reference.trim(), accessToken.trim()) : [];
        },
        enabled: reference.trim().length > 0 && searchVoucher,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setVoucher([]);
            const updatedVoucher = Array.isArray(data) ? data : [];
            setVoucher(updatedVoucher);
            if (updatedVoucher.length > 0) {
                setNotFoundMsg(false);
                setShowRedemptionCard(true);
            } else {
                setNotFoundMsg(true);
            }
            queryClient.resetQueries({ queryKey: "voucher", exact: true }).then(() => {
                setSearchVoucher(false);
                setReference("");
            });
        }
        if (error) {
            Alert.alert("Sorry, something went wrong, please try again later");
        }
    }, [isSuccess, data, error, searchVoucher]);

    const redeemVoucher = ()=>{
        setTimeout(()=>{
            setShowConfirm(false)
        }, 200)
        router.push({
            pathname: '/redeem-voucher/[till_no]',
            params: { till_no: tillNo },
        });
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <ThemedStatusBar theme={theme}/>
                {showConfirm && (
                    <CustomConfirmationModal
                        theme={theme}
                        isVisible={showConfirm}
                        closeModal={resetState}
                        title="Confirm"
                        message="Are you certain you wish to redeem this voucher?"
                        redeem={()=>redeemVoucher()}
                        loading={false}
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
                {(isSuccess && voucher.length > 0 && showRedemptionCard) && (
                    <RedemptionCard
                        theme={theme}
                        voucher={voucher}
                        shop={(shop?.company?.company_name + "  " + shop?.location) || "no shop"}
                        tillNo={tillNo}
                        setTillNo={setTillNo}
                        resetState={resetState}
                        showConfirmationModal={()=>setShowConfirm(true)}
                        isLoading={isLoading || isFetching || isPending}
                    />
                )}
                {(!isLoading && voucher.length === 0 && notFoundMsg && !isPending && !isFetching) && (
                    < VoucherNotFoundCard
                        theme={theme} resetState={resetState}
                        voucher={voucher} isLoading={isLoading}
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



