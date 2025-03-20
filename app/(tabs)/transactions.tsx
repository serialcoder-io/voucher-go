import {ScrollView, StyleSheet, View, Modal, Pressable, FlatList, ActivityIndicator,} from "react-native";
import React, {useState, useEffect, useCallback} from "react";
import {Theme, Voucher} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {useQuery} from "@tanstack/react-query";
import {getVouchersRedeemedAtShop} from "@/lib/services/redemptions";
import {useShopStore} from "@/store/shop";
import ThemedStatusBar from "@/components/status-bar";
import {useAuthStore} from "@/store/AuthStore";
import ParentContainer from "@/components/parent-container";
import {renderSkeleton} from "@/components/ui/(tabs)/transactions/voucher-skelton";
import {Text} from "@rneui/themed";
//import {useFocusEffect} from "expo-router";
import TransactionCard from "@/components/ui/(tabs)/transactions/transaction-card";
import {commonColors} from "@/constants/Colors";



function Transactions(){
    const {theme} = useTheme();
    const {shop} = useShopStore()
    const accessToken = useAuthStore.use.tokens().access
    const styles = getStyles(theme);
    const [vouchers, setVouchers] = useState<Voucher[] | []>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isBottom, setIsBottom] = useState(false);
    const initialData =  {
        next: null,
        previous: null,
        vouchers: [],
    }

    const { data, isLoading, isSuccess, error, isFetched, isFetching } = useQuery({
        queryKey: ["redemtions", currentPage],
        queryFn: async () => {
            return shop ?
                await getVouchersRedeemedAtShop(accessToken.trim(), currentPage) : initialData;
        },
        initialData: initialData,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setVouchers(prevVouchers => {
                const newVouchers = data.vouchers || [];
                const existingVoucherIds = prevVouchers.map(voucher => voucher.id);
                const filteredNewVouchers = newVouchers.filter(voucher => !existingVoucherIds.includes(voucher.id));
                return [...prevVouchers, ...filteredNewVouchers];
            });
            setNextUrl(data.next || null);
        }
        setIsBottom(false);
    }, [data, currentPage]);

    const handleScroll = (event: any) => {
        const contentHeight = event.nativeEvent.contentSize.height; // Total height of the content
        const contentOffsetY = event.nativeEvent.contentOffset.y; // Current scroll position
        const layoutHeight = event.nativeEvent.layoutMeasurement.height; // Visible height of the ScrollView
        if (contentHeight - contentOffsetY <= layoutHeight + 20) {
            setIsBottom(true);
            if(nextUrl !== null){
                setCurrentPage((page)=>page+1)
            }
        } else {
            setIsBottom(false);
        }
    };


    if(error){
        return (
            <ParentContainer>
                <Text style={{color: commonColors.dangercolor}}>
                    Sorry, something went wrong, we couldn't fetch redemptions.
                </Text>
            </ParentContainer>
        )
    }

    if(isFetched && vouchers.length === 0){
        return (
            <ParentContainer>
                <Text style={{color: theme.textSecondary, fontSize: 18}}>
                    No redeemed vouchers found
                </Text>
            </ParentContainer>
        )
    }

    if((isLoading || isFetching) && vouchers.length === 0){
        return (
            <ParentContainer>
                {renderSkeleton(7)}
            </ParentContainer>
        )
    }

    const renderFooterLoader = () => {
        if (isBottom && isFetching) {
            return (
                <View style={styles.loaderContainer}>
                    <Text style={{fontSize: 18, color: commonColors.primaryColor}}>Loading...</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={{paddingHorizontal: 12, backgroundColor: theme.background}}>
            <FlatList
                data={vouchers}
                renderItem={({ item }) => (
                    <TransactionCard
                        amount={item.amount}
                        date={item?.redemption?.redeemed_on! || item.date_time_created}
                        refNumber={item.voucher_ref}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ListFooterComponent={renderFooterLoader}
            />
        </View>
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
    loaderContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
