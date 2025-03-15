import React, {useEffect} from 'react';
import {ScrollView, View, StatusBar, StyleSheet, Alert} from 'react-native';
import { Text, Icon, Card, Button, Divider } from '@rneui/themed';
import PrimaryButton from "@/components/ui/primary-button";
import {useTheme} from "@/hooks/useTheme";
import {Jwt, Theme} from "@/lib/definitions";
import {useShopStore} from "@/store/shop";
import {useLocalSearchParams, useRouter} from "expo-router";
//import {useQuery} from "@tanstack/react-query";
//import {queryClient} from "@/lib/queryClient";
import {useVoucherStore} from "@/store/voucher";
import CardRow from "@/components/ui/(tabs)/card-row";
import {useMutation} from "@tanstack/react-query";
import {redeemVoucher, RedemptionParams, RedemptionResponse} from "@/lib/services/voucher";
import {useAuthStore} from "@/store/AuthStore";
import Loader from "@/components/ui/loader";

function Index() {
    const { till_no } = useLocalSearchParams();
    const {theme} = useTheme();
    const shop = useShopStore.use.shop();
    const accessToken = useAuthStore.use.tokens().access;

    const styles = getStyles(theme);
    const {voucher, setVoucher} = useVoucherStore();
    const router = useRouter();

    const mutation = useMutation<RedemptionResponse, Error, RedemptionParams>({
        mutationFn: redeemVoucher,
    });

    const handleRedeem = async()=>{
        const shopId = shop?.id ? shop?.id : "";
        const tillNo = Array.isArray(till_no) ? parseInt(till_no[0]) : parseInt(till_no) || "";
        const voucherId = voucher[0].id
        if(shopId && tillNo){
            try {
                const result = await mutation.mutateAsync({ voucherId, shopId, tillNo, accessToken});
                switch (result.http_status) {
                    case 201:
                        mutation.reset()
                        break;
                    case 400:
                        Alert.alert("Warning", result.details);
                        break;
                    case 404:
                        Alert.alert("Sorry", result.details);
                        break;
                    default:
                        result.details ?
                            Alert.alert("Error", result.details):
                            Alert.alert("Error", "Sorry something went wrong.");
                }
            } catch (error) {
                Alert.alert("Sorry, something went wrong, please try again later");
            }
        }
    }

    useEffect(() => {
        handleRedeem()
    }, []);

    if(mutation.isPending){
        return <Loader />
    }

    if(mutation.isError){
        return (
            <View><Text>Sorry Something went wrong, please try again later</Text></View>
        )
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                    <Card containerStyle={styles.card}>
                        <View>
                            <Text style={styles.sectionTitle}>Voucher redeemed successfully</Text>
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
                            <Text style={[styles.sectionTitle, {marginTop: 22}]}>Shop</Text>
                        </View>
                        <CardRow
                            iconName="shop" label="Shop"
                            value={(shop?.company?.company_name + "  " + shop?.location)}
                        />
                        <CardRow iconName="point-of-sale" label="Checkout N°" value={`${till_no}`}/>
                        <View style={styles.confirmBtnContainer}>
                            <PrimaryButton
                                title="Done"
                                actionOnPress={() => {
                                    setVoucher([]);  // Réinitialiser le voucher
                                    router.back();   // Retourner à la page précédente
                                }}
                                width='100%'
                            />
                        </View>
                    </Card>
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
        elevation: 1
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
    },
    sectionTitle:{
        fontSize: 20,
        marginBottom: 20,
        color: theme.textPrimary
    }
});



