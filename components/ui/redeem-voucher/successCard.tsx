import {StyleSheet, View} from "react-native";
import {Card, Divider, Icon, Text} from "@rneui/themed";
import CardRow from "@/components/ui/(tabs)/card-row";
import PrimaryButton from "@/components/ui/primary-button";
import React from "react";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";

type SuccessCardProps = {
    voucher_ref: string;
    amount: string;
    redemption_date: string;
    shop: string
    till_no: string | number
    redirect: () => void;
}

function SuccessCard({
    voucher_ref,
    amount,
    redemption_date,
    shop,
    till_no,
    redirect,
}: SuccessCardProps) {
    const {theme} = useTheme();
    const styles = getStyles(theme);
    return (
        <Card containerStyle={styles.card}>
            <View style={styles.titleContainer}>
                <Icon name="check-circle" type='material' color="green" size={35} />
                <Text style={{fontSize: 17, color: theme.textPrimary}}>Voucher redeemed successfully</Text>
            </View>
            <CardRow iconName="tag" label="Ref" value={voucher_ref}/>
            <CardRow iconName="money" label="Amount" value={`${amount} Rs`}/>
            <Divider />
            {/*shop*/}
            <View>
                <Text style={[styles.sectionTitle, {marginTop: 22}]}>Redeemed</Text>
            </View>
            <CardRow
                iconName="event" label="On"
                value={redemption_date}
            />
            <CardRow
                iconName="shop" label="At"
                value={shop}
            />
            <CardRow iconName="point-of-sale" label="Checkout N°" value={`${till_no}`}/>
            <View style={styles.confirmBtnContainer}>
                <PrimaryButton
                    title="Done"
                    actionOnPress={redirect}
                    width='100%'
                />
            </View>
        </Card>
    )
}

export default SuccessCard;

const getStyles = (theme: Theme) => StyleSheet.create({
    card: {
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 25,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 2
    },
    confirmBtnContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    sectionTitle:{
        fontSize: 20,
        marginBottom: 20,
        color: theme.textPrimary,
        textAlign: "center"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 20,
        rowGap: 10
    }
});
