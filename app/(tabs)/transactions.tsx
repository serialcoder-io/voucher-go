import {ScrollView, StyleSheet, View} from "react-native";
import React, {useState, useEffect, useCallback} from "react";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {useQuery} from "@tanstack/react-query";
import {getVouchersRedeemedAtShop} from "@/lib/services/redemptions";
import {useShopStore} from "@/store/shop";
import ThemedStatusBar from "@/components/status-bar";
import {useAuthStore} from "@/store/AuthStore";
import ParentContainer from "@/components/parent-container";
import Loader from "@/components/ui/loader";
import {Text} from "@rneui/themed";
import {useFocusEffect} from "expo-router";

function Transactions(){
    const {theme} = useTheme();
    const {shop} = useShopStore()
    const accessToken = useAuthStore.use.tokens().access
    const styles = getStyles(theme);

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
            <View style={styles.skeletonItem} />
            <View style={styles.skeletonItem} />
            <View style={styles.skeletonItem} />
        </View>
    );

    if(isFetched && data?.length === 0){
        return <Text>No redeemed vouchers found</Text>
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <ThemedStatusBar theme={theme}/>
                {true ? (
                    renderSkeleton()
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
    skeletonItem: {
        width: '100%',
        height: 45,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        borderRadius: 8,
    },
});
