import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import React, {useState, useEffect, useCallback} from "react";
import {Theme, Voucher} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {useQuery} from "@tanstack/react-query";
import {getVouchersRedeemedAtShop} from "@/lib/services/redemptions";
import {useShopStore} from "@/store/shop";
import {useAuthStore} from "@/store/AuthStore";
import ParentContainer from "@/components/parent-container";
import {renderSkeleton} from "@/components/ui/(tabs)/transactions/voucher-skelton";
import {Text} from "@rneui/themed";
//import {useFocusEffect} from "expo-router";
import TransactionCard from "@/components/ui/(tabs)/transactions/transaction-card";
import {commonColors} from "@/constants/Colors";
import {queryClient} from "@/lib/queryClient";


function Transactions(){
    const {theme} = useTheme();
    const {shop} = useShopStore()
    const accessToken = useAuthStore.use.tokens().access
    const styles = getStyles(theme);
    const [vouchers, setVouchers] = useState<Voucher[] | []>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isBottom, setIsBottom] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const initialData =  {
        next: null,
        previous: null,
        vouchers: [],
    }

    const { data, isLoading, isSuccess, error, isFetched, isFetching } = useQuery({
        queryKey: ["redemptions", currentPage],
        queryFn: async () => {
            return shop ?
                await getVouchersRedeemedAtShop(accessToken.trim(), currentPage, shop.id) : initialData;
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

    const handleOnScroll = (event: any) => {
        handleScroll({event, nextUrl, setIsBottom, setCurrentPage});
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setVouchers([]); // Vide la liste affichée

        // Supprime le cache de toutes les pages (utile pour éviter les doublons en pagination)
        queryClient.removeQueries({ queryKey: ["redemptions"], exact: false });

        // Forcer un refetch immédiat de la première page
        queryClient
            .fetchQuery({
                queryKey: ["redemptions", 1],
                queryFn: () => getVouchersRedeemedAtShop(accessToken.trim(), 1, shop!.id),
            })
            .then((freshData) => {
                setVouchers(freshData.vouchers || []);
                setCurrentPage(1); // On s'assure d'être sur la page 1
                setNextUrl(freshData.next || null);
            })
            .finally(() => {
                setRefreshing(false);
            });
    }, []);

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
        <View style={{paddingHorizontal: 12, backgroundColor: theme.background, flex: 1, paddingTop: 10}}>
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
                onScroll={handleOnScroll}
                scrollEventThrottle={16}
                ListFooterComponent={renderFooterLoader}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing && isFetching}
                        onRefresh={onRefresh}
                        colors={['grey']}
                        progressBackgroundColor={'black'}
                    />
                }
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
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


type HandleScrollParams = {
    event: any;
    nextUrl: string | null;
    setIsBottom: (value: boolean) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export function handleScroll({
    event,
    nextUrl,
    setIsBottom,
    setCurrentPage,
}: HandleScrollParams) {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (contentHeight - contentOffsetY <= layoutHeight + 20) {
        setIsBottom(true);
        if (nextUrl !== null) {
            setCurrentPage((page) => page + 1);
        }
    } else {
        setIsBottom(false);
    }
}