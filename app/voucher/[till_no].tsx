import React, {useEffect} from 'react';

// components
import SuccessCard from "@/components/ui/voucher/successCard";
import Loader from "@/components/ui/loader";

// hooks
import {useShopStore} from "@/store/shop";
import {useVoucherStore} from "@/store/voucher";
import {useAuthStore} from "@/store/AuthStore";
import {useTheme} from "@/hooks/useTheme";
import {useLocalSearchParams, useRouter} from "expo-router";
import useRedeemVoucher from "@/hooks/useRedeemVoucher";


//react-native
import {ScrollView, StatusBar, View} from 'react-native';
import {ALERT_TYPE} from "react-native-alert-notification";

import {formatDate, showDialog} from "@/utils";
import {getStyles} from "@/styles/voucher/redemption.styles"
import {handleRedeem} from "@/utils/voucher.utils";

function Index() {
    const { till_no } = useLocalSearchParams();
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();
    const accessToken = useAuthStore.use.tokens().access;
    const {voucher, setVoucher} = useVoucherStore();
    const router = useRouter();
    const styles = getStyles(theme);
    const mutation = useRedeemVoucher()

    const shopId = shop?.id ? shop?.id : "";
    const tillNo = Array.isArray(till_no) ? parseInt(till_no[0]) : parseInt(till_no) || "";
    const voucherId = voucher[0].id

    const redirect = () => {
        setVoucher([]);
        router.back();
    }

    const onRedeem = async () => {
        try {
            await handleRedeem({ mutation, shopId, tillNo, voucherId, accessToken, redirect, theme });
        } finally {
            mutation.reset();
        }
    };

    useEffect(() => {
        onRedeem()
    }, []);

    if(mutation.isPending){
        return <Loader />
    }

    if(mutation.isError){
        const errorMsg = "Sorry Something went wrong, try again later."
        return showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect)
    }

    if(mutation.data?.voucher_info === null){
        const errorMsg = "Sorry Something went wrong, try again later."
        return showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect)
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




