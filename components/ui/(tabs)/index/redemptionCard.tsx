import {StyleSheet, View} from "react-native";
import {Button, Card, Divider, Icon, Text} from "@rneui/themed";
import CardRow from "@/components/ui/(tabs)/card-row";
import BorderedInput from "@/components/ui/bordered-input";
import React from "react";
import {Theme, Voucher} from "@/lib/definitions";
import {useRouter} from "expo-router";
import {commonColors} from "@/constants/Colors";
import {isVoucherExpired, isVoucherInvalidStatus} from "@/lib/utils";
import VoucherCardError from "@/components/ui/(tabs)/index/voucher-cardError";

type RedemptionCardProps = {
    theme: Theme;
    voucher: Voucher[];
    shop: string
    tillNo: string
    setTillNo: (val: string) => void;
    resetState: () => void;
}

function RedemptionCard({
    theme,
    voucher,
    shop,
    tillNo,
    setTillNo,
    resetState,
}: RedemptionCardProps) {
    const router = useRouter();
    const styles = getStyles(theme);
    const voucherInvalidStatus = isVoucherInvalidStatus(voucher[0])
    const voucherExpired = isVoucherExpired(voucher[0])
    const voucherStatus = voucher[0].voucher_status

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
                    `The voucher is currently "${voucherStatus}". It must be in the "issued" status before it can be redeemed.`
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