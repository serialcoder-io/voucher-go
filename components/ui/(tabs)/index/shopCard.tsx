import {Card, Text} from "@rneui/themed";
import React from "react";
import {Theme} from "@/types";
import {StyleSheet} from "react-native";
import {commonColors} from "@/constants/Colors";
import {useTheme} from "@/hooks/useTheme";

type ShopCardProps = {
    companyName: string;
    shopLocation: string;
};

function ShopCard({companyName, shopLocation}: ShopCardProps) {
    const {theme} = useTheme();
    const styles = getStyles(theme);
    return (
        <Card containerStyle={[styles.card, styles.storeCard]}>
            <Text style={styles.storeName}>{companyName}</Text>
            <Text style={styles.shop}>Shop: {shopLocation}</Text>
        </Card>
    )
}
export default ShopCard;

const getStyles = (theme: Theme) => StyleSheet.create({
    card: {
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 3
    },
    storeCard: {
        borderLeftWidth: 6,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: commonColors.primaryColor,
        paddingVertical: 15,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 2
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.textPrimary,
        paddingVertical: 5
    },
    shop: {
        color: theme.textSecondary,
        paddingVertical: 5,
        fontSize: 15
    },
});