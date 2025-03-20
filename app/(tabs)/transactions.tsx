import {ScrollView, StyleSheet, View, Modal, Pressable,} from "react-native";
import React, {useState, useEffect, useCallback} from "react";
import {Theme, Voucher} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {useQuery} from "@tanstack/react-query";
import {getVouchersRedeemedAtShop} from "@/lib/services/redemptions";
import {useShopStore} from "@/store/shop";
import ThemedStatusBar from "@/components/status-bar";
import {useAuthStore} from "@/store/AuthStore";
import ParentContainer from "@/components/parent-container";
import VoucherSkelton from "@/components/ui/(tabs)/transactions/voucher-skelton";
import {Text} from "@rneui/themed";
import {useFocusEffect} from "expo-router";
import TransactionCard from "@/components/ui/(tabs)/transactions/transaction-card";


function Transactions(){
    const {theme} = useTheme();
    const {shop} = useShopStore()
    const accessToken = useAuthStore.use.tokens().access
    const styles = getStyles(theme);
    const [vouchers, setVouchers] = useState<Voucher[] | []>([]);

    const { data, isLoading, isSuccess, error, isFetched, isPending, isFetching, refetch } = useQuery({
        queryKey: ["redemtions", shop?.id],
        queryFn: async () => {
            return shop ?
                await getVouchersRedeemedAtShop(shop.id, accessToken.trim()) : [];
        },
        enabled: !!shop,
    });

    useFocusEffect(
        useCallback(() => {
            refetch(); // Refetch when the screen is focused
        }, [refetch])
    );

    if(error){
        return (
            <ParentContainer>
                <Text>Sorry, something went wrong, we couldn't fetch redemptions.</Text>
            </ParentContainer>
        )
    }

    const renderSkeleton = () => (
        <View style={styles.skeletonContainer}>
            {Array.from({ length: 7 }).map((_, index) => (
                <VoucherSkelton key={index} />
            ))}
        </View>
    );

    {/*if(isFetched && data?.length === 0){
        return <Text>No redeemed vouchers found</Text>
    }*/}

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <ThemedStatusBar theme={theme}/>
                {true ? (
                    //renderSkeleton()
                    <>
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                        <TransactionCard />
                    </>
                ) : (
                    data?.map((voucher, index) => (
                        <Text key={index}>{voucher.voucher_ref}</Text>
                    ))
                )}
            </View>
        </ScrollView>
    )
}

export default Transactions;


const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    skeletonContainer: {
        width: '100%',
    },
    centeredView: {
        flex: 1,
        position: "fixed",
        top: 90,
        left: 65,
        width: 350
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
