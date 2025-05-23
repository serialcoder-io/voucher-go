import React, {useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
import {useShopStore} from "@/store/shop";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useVoucherStore} from "@/store/voucher";
import {useMutation} from "@tanstack/react-query";
import {redeemVoucher, RedemptionParams, RedemptionResponse} from "@/lib/services/voucher";
import {useAuthStore} from "@/store/AuthStore";
import Loader from "@/components/ui/loader";
import {ALERT_TYPE} from "react-native-alert-notification";
import {formatDate, showDialog, showToast} from "@/lib/utils";
import SuccessCard from "@/components/ui/redeem-voucher/successCard";


function Index() {
    const { till_no } = useLocalSearchParams();
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();
    const accessToken = useAuthStore.use.tokens().access;
    const {voucher, setVoucher} = useVoucherStore();
    const router = useRouter();
    const styles = getStyles(theme);

    const mutation = useMutation<RedemptionResponse, Error, RedemptionParams>({
        mutationFn: redeemVoucher,
    });

    const redirect = () => {
        mutation.reset()
        setVoucher([]);
        router.back();
    }

    const handleRedeem = async(): Promise<void>=>{
        const shopId = shop?.id ? shop?.id : "";
        const tillNo = Array.isArray(till_no) ? parseInt(till_no[0]) : parseInt(till_no) || "";
        const voucherId = voucher[0].id
        if(shopId && tillNo){
            try {
                const result = await mutation.mutateAsync({ voucherId, shopId, tillNo, accessToken});
                switch (result.http_status) {
                    case 201:
                        showToast("Redeemed", mutation?.data?.details!, ALERT_TYPE.SUCCESS, theme)
                        break;
                    case 400:
                        showDialog('Warning', result.details, ALERT_TYPE.WARNING, redirect)
                        break;
                    case 404:
                        showDialog('Error', mutation?.data?.details!, ALERT_TYPE.DANGER, redirect)
                        break;
                    default:
                        const defaultMsg = "Sorry something went wrong. please try again later."
                        const errorMsg = result.details ? result.details : defaultMsg
                        showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect)
                }
            } catch (error) {
                const errorMsg = "Sorry, something went wrong, please try again later"
                showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect)
            }
        }else {
            const errorMsg = "Invalid data. Please check the voucher, shop, or till number."
            showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect)
        }
    }

    useEffect(() => {
        handleRedeem()
    }, []);

    if(mutation.isPending){
        return <Loader />
    }

    if(mutation.isError){
        const errorMsg = "Sorry Something went wrong, try again later."
        return showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect)
    }

    if(mutation.data?.voucher_info === null){
        return null;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <SuccessCard
                    voucher_ref={voucher[0]?.voucher_ref}
                    amount={`${voucher[0]?.amount}`}
                    redemption_date={
                        formatDate(mutation.data?.voucher_info.redemption.redeemed_on!) || "not voucher_infos"
                    }
                    shop={(shop?.location!)}
                    till_no={`${till_no}`}
                    redirect={redirect}
                />
            </View>
        </ScrollView>
    );
}
export default Index;


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



