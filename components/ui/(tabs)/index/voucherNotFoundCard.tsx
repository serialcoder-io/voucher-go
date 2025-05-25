import {Card, Icon} from "@rneui/themed";
import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Theme, Voucher} from "@/types";

type VoucherNotFoundCardProps = {
    theme: Theme;
    resetState: () => void;
    voucher: Voucher[] | [];
    isLoading: boolean;
}

function VoucherNotFoundCard({theme, resetState, voucher, isLoading}: VoucherNotFoundCardProps) {

    const [voucherData, setVoucherData] = useState<Voucher | null>(null);

    useEffect(() => {
        if (!isLoading && voucher.length > 0) {
            setVoucherData(voucher[0]);
        }
    }, [voucher, isLoading]);

    if (voucherData) {
        return null;
    }
    const styles = getStyles(theme);
    return (
        <View style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <Card containerStyle={styles.card}>
                <View style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Pressable onPress={()=>resetState()}>
                        <Icon name="close" type='material' color={theme.textPrimary} size={35} />
                    </Pressable>
                </View>
                <View style={styles.titleContainer}>
                    <Icon name="search-off" type='material' color="red" size={35} />
                    <Text style={{fontSize: 17, color: "red"}}>Not found</Text>
                    <Text style={{fontSize: 14, color: theme.textSecondary, paddingTop: 10}}>Voucher with given reference doesn't exist</Text>
                </View>
            </Card>
        </View>
    )
}

export default VoucherNotFoundCard;

const getStyles = (theme: Theme) => StyleSheet.create({
    card: {
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 2
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
});