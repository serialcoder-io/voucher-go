import React from 'react';
import {ScrollView, View, StatusBar, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Text, Icon, Card, Button, Divider } from '@rneui/themed';
import PrimaryButton from "@/components/ui/primary-button";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
//import {useGlobalStyles} from "@/styles/global";
import {commonColors} from "@/constants/Colors";
import {useShopStore} from "@/store/shop";
import {useLocalSearchParams, useRouter} from "expo-router";
//import {useQuery} from "@tanstack/react-query";
//import {queryClient} from "@/lib/queryClient";
import {useVoucherStore} from "@/store/voucher";

function Index() {
    const { till_no } = useLocalSearchParams();
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();

    const styles = getStyles(theme);
    const {voucher, setVoucher} = useVoucherStore();
    const router = useRouter();


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                {/* redemption card*/}
                {voucher.length > 0 && (
                    <Card containerStyle={styles.card}>
                        <View>
                            <Text style={{fontSize: 20, marginBottom: 20}}>Voucher</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View style={styles.optionRow} >
                                <Icon
                                    name="tag" type='material' size={23}
                                    style={styles.icon} color={theme.textSecondary}
                                />
                                <Text style={{color: theme.textPrimary, fontSize: 16}}>Ref :</Text>
                            </View>
                            <Text style={styles.refText}>{voucher[0]?.voucher_ref}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View style={styles.optionRow} >
                                <Icon
                                    name="money" type='material' size={23}
                                    style={styles.icon} color={theme.textSecondary}
                                />
                                <Text style={{color: theme.textPrimary, fontSize: 16}}>Amount :</Text>
                            </View>
                            <Text style={styles.amountText}>{voucher[0]?.amount} Rs</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View style={styles.optionRow} >
                                <Icon
                                    name="date-range" type='material' size={23}
                                    style={styles.icon} color={theme.textSecondary}
                                />
                                <Text style={{color: theme.textPrimary, fontSize: 16}}>Validity :</Text>
                            </View>
                            <Text style={styles.amountText}>{voucher[0]?.expiry_date || "no voucher found"}</Text>
                        </View>
                        <Divider />

                        {/*shop*/}
                        <View>
                            <Text style={{fontSize: 20, marginTop: 17, marginBottom: 20}}>Shop</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View style={styles.optionRow} >
                                <Icon
                                    name="shop" type='material' size={23}
                                    style={styles.icon} color={theme.textSecondary}
                                />
                                <Text style={{color: theme.textPrimary, fontSize: 16}}>Shop :</Text>
                            </View>
                            <Text style={styles.amountText}>{(shop?.company?.company_name + "  " + shop?.location) || "intermart  Ebene"}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View style={styles.optionRow} >
                                <Icon
                                    name="point-of-sale" type='material' size={23}
                                    style={styles.icon} color={theme.textSecondary}
                                />
                                <Text style={{color: theme.textPrimary, fontSize: 16}}>Till no :</Text>
                            </View>
                            <Text style={styles.amountText}>{till_no}</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 10}}>
                            <PrimaryButton
                                title="Confirm"
                                actionOnPress={() =>console.log("redeemed")}
                                width='100%'
                            />
                        </View>
                        <Button
                            title='Cancel'
                            type='outline'
                            buttonStyle={styles.cancelButton}
                            titleStyle={{color: theme.textPrimary}}
                            onPress={() => router.back()}
                        />
                    </Card>
                )}
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
    card: {
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 25,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 6
    },
    storeCard: {
        borderLeftWidth: 5,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftColor: commonColors.primaryColor,
        paddingVertical: 15,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 6
    },
    storeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    storeLocation: {
        color: theme.textSecondary,
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
    icon: {
        marginRight: 10,
    },
    refText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    amountText:{color: theme.textSecondary,},
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        flex: 1,
        marginLeft: 10,
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
    }
});



