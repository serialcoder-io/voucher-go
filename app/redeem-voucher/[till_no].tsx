import React from 'react';
import {ScrollView, View, StatusBar, StyleSheet} from 'react-native';
import { Text, Icon, Card, Button, Divider } from '@rneui/themed';
import PrimaryButton from "@/components/ui/primary-button";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
import {useShopStore} from "@/store/shop";
import {useLocalSearchParams, useRouter} from "expo-router";
//import {useQuery} from "@tanstack/react-query";
//import {queryClient} from "@/lib/queryClient";
import {useVoucherStore} from "@/store/voucher";
import CardRow from "@/components/ui/(tabs)/card-row";

function Index() {
    const { till_no } = useLocalSearchParams();
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();

    const styles = getStyles(theme);
    const {voucher} = useVoucherStore();
    const router = useRouter();

    const redeem = ()=>{
        console.log("redeemed");
    }

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
                        <CardRow iconName="tag" label="Ref" value={voucher[0]?.voucher_ref}/>
                        <CardRow iconName="money" label="Amount" value={`${voucher[0]?.amount} Rs`}/>
                        <CardRow
                            iconName="date-range" label="Validity"
                            value={voucher[0]?.expiry_date || "no voucher found"}
                        />
                        <Divider />
                        {/*shop*/}
                        <View>
                            <Text style={{fontSize: 20, marginTop: 17, marginBottom: 20}}>Shop</Text>
                        </View>
                        <CardRow
                            iconName="shop" label="Shop"
                            value={(shop?.company?.company_name + "  " + shop?.location)}
                        />
                        <CardRow iconName="point-of-sale" label="Checkout N°" value={`${till_no}`}/>
                        <View style={styles.confirmBtnContainer}>
                            <PrimaryButton title="Confirm"
                                actionOnPress={() =>redeem()}
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
    confirmBtnContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    cancelButton: {
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 15,
        borderColor: theme.textPrimary,
    }
});



