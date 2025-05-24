import {StyleSheet, View} from "react-native";
import {Button, Card, Divider, Icon, Text} from "@rneui/themed";
import CardRow from "@/components/ui/(tabs)/card-row";
import BorderedInput from "@/components/ui/bordered-input";
import React, {useEffect, useState} from "react";
import {Theme, Voucher} from "@/lib/definitions";
import {useRouter} from "expo-router";
import {commonColors} from "@/constants/Colors";
import {isVoucherExpired, isVoucherInvalidStatus} from "@/app/voucher/voucher.validations"
import VoucherCardError from "@/components/ui/(tabs)/index/voucher-cardError";
import Loader from "@/components/ui/loader";

type RedemptionCardProps = {
    theme: Theme;
    voucher: Voucher[];
    shop: string
    tillNo: string
    setTillNo: (val: string) => void;
    resetState: () => void;
    showConfirmationModal: () => void;
    isLoading: boolean;
}

function RedemptionCard({
    theme,
    voucher,
    shop,
    tillNo,
    setTillNo,
    resetState,
    showConfirmationModal,
    isLoading,
}: RedemptionCardProps) {
    const router = useRouter();
    const styles = getStyles(theme);
    const voucherInvalidStatus = isVoucherInvalidStatus(voucher[0])
    const voucherExpired = isVoucherExpired(voucher[0])
    const voucherStatus = voucher[0].voucher_status
    const voucherAlreadyRedeemedMsg = "The voucher with the given reference has already been used and cannot be redeemed again.";
    const voucherCancelledMsg = "The voucher has been cancelled by the supplier and is no longer available.";
    const voucherIsProvisionalMsg = `The voucher is "${voucherStatus}". It must be "issued" before it can be redeemed. please contact supplier`

    const [voucherData, setVoucherData] = useState<Voucher | null>(null);

    useEffect(() => {
        if (!isLoading && voucher.length > 0) {
            setVoucherData(voucher[0]);
        }
    }, [voucher, isLoading]);

    if(isLoading){
        return <Loader />
    }

    if (!voucherData) {
        return null;
    }

    if(voucherExpired){
        return (
            <VoucherCardError
                theme={theme}
                reference={voucher[0]?.voucher_ref}
                resetState={()=>resetState()}
                iconName="event-busy"
                title="Expired"
                message="The voucher with given reference is no longer valid as it has expired."
            />
        )
    }

    if(voucherInvalidStatus){
        return (
            <VoucherCardError
                theme={theme}
                reference={voucher[0]?.voucher_ref}
                resetState={()=>resetState()}
                iconName="cancel"
                title="Invalid status"
                message={
                    voucherStatus === "cancelled"
                        ? voucherCancelledMsg
                        : voucherStatus === "redeemed"
                        ? voucherAlreadyRedeemedMsg
                        : voucherIsProvisionalMsg
                }
            />
        )
    }


    return (
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
                value={shop}
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
                onPress={showConfirmationModal}
            />
            <Button
                title='Cancel'
                type='outline'
                buttonStyle={styles.cancelButton}
                titleStyle={{color: theme.textPrimary}}
                onPress={() => resetState()}
            />
        </Card>
    )
}

export default RedemptionCard;


const getStyles = (theme: Theme) => StyleSheet.create({
    card: {
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 6
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
    refText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textPrimary,
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
    },
    closeButtonContainer:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});