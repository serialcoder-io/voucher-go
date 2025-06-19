import {View, RefreshControl, SectionList, StatusBar, TouchableOpacity, StyleSheet} from "react-native";
import React, {useState, useEffect, useCallback} from "react";

// components
import {Text} from "@rneui/themed";
import ParentContainer from "@/components/parentContainer";
import {renderSkeleton} from "@/components/ui/(tabs)/transactions/voucherSkelton";
import TransactionCard from "@/components/ui/(tabs)/transactions/transactionCard";
import NoInternetScreen from '@/components/ui/NoInternet';

// hooks
import {useTheme} from "@/hooks/useTheme";
import {useQuery} from "@tanstack/react-query";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

// store
import {useShopStore} from "@/store/shop";
import {useAuthStore} from "@/store/AuthStore"


import {Theme, Voucher} from "@/types";
import {getVouchersRedeemedAtShop} from "@/lib/services/redemptions";
import {commonColors} from "@/constants/Colors";
import {queryClient} from "@/lib/queryClient";
import {handleScroll, groupVouchersByDate} from "@/utils/transactions.utils"
import {getStyles} from "@/styles/(tabs)/transactions.styles";



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
    const [isConnected, checkNetwork] = useNetworkStatus();
    const noRedeemedFoundStyle = notFoundStyles(theme)

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
        enabled: !!isConnected,
        initialData: initialData,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setVouchers(prevVouchers => {
                const newVouchers = data.vouchers || [];
                const existingVoucherIds = prevVouchers.map(voucher => voucher.id);
                const filteredNewVouchers = newVouchers.filter(voucher => !existingVoucherIds.includes(voucher.id));
                // Fusionner les anciens + nouveaux
                const combinedVouchers = [...prevVouchers, ...filteredNewVouchers];

                // Trier par redemption.redeem_at (du plus récent au plus ancien par exemple)
                combinedVouchers.sort((a, b) => {
                    const dateA = new Date(a.redemption?.redeemed_on || 0).getTime();
                    const dateB = new Date(b.redemption?.redeemed_on || 0).getTime();
                    return dateB - dateA;
                });

                return combinedVouchers;
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

    if (isConnected === false) {
        return <NoInternetScreen onRetry={checkNetwork} />;
    }

    if(error){
        return (
            <ParentContainer>
                <Text style={{color: commonColors.dangercolor}}>
                    Sorry, something went wrong, we couldn't fetch redemptions.
                </Text>
            </ParentContainer>
        )
    }

    // no redeem voucher found

    if(isFetched && vouchers.length === 0){
        return (
            <ParentContainer>
                <Text style={noRedeemedFoundStyle.title}>No vouchers have been redeemed for this shop</Text>
                <TouchableOpacity style={noRedeemedFoundStyle.button} onPress={()=>onRefresh()}>
                    <Text style={noRedeemedFoundStyle.buttonText}>Refresh</Text>
                </TouchableOpacity>
            </ParentContainer>
        );
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
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={commonColors.primaryColor}
            />
            <SectionList
                sections={groupVouchersByDate(vouchers)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TransactionCard
                        amount={item.amount}
                        date={item?.redemption!.redeemed_on}
                        refNumber={item.voucher_ref}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionTitle}>{title}</Text>
                )}
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


export const notFoundStyles = (theme: Theme) => StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
    color: theme.textPrimary,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: commonColors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: theme.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
});
