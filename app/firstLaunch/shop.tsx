// components
import ParentContainer from "@/components/parentContainer";
import RenderItem from "@/components/ui/shop/renderItem";
import PrimaryButton from "@/components/ui/primaryButton";
import { Dropdown } from 'react-native-element-dropdown';
import {View, Text, Alert} from "react-native";
import {Button, Icon} from "@rneui/themed";

//hooks
import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from "@/hooks/useTheme";
import {useRouter} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import { useShopStore } from "@/store/shop";

import {Company, Shop} from "@/types";

// lib
import {fetchAllCompanies, fetchShops} from "@/lib/services/company";
import {queryClient} from "@/lib/queryClient";
import {commonColors} from "@/constants/Colors";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {getStyles} from "@/styles/firstLaunch/shop.styles";


function Label({ title }: { title: string }) {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return <Text style={styles.label}>{title}</Text>;
}

function ShopSetup(){
    const [company, setCompany] = useState<number | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);
    const [selectedShopId, setSelectedShopId] = useState(null);
    const setShop = useShopStore.use.setShop(); // global store (Zustand)
    const {theme} = useTheme();
    const styles = getStyles(theme)
    const router = useRouter();

    const saveShop = async()=>{
        const selectedShop = shops.find((shop) => shop.id === selectedShopId);
        if(selectedShop){
            await asyncStorage.setItem("shop", JSON.stringify(selectedShop));
            await asyncStorage.setItem("first_launch", "1");
            setShop(selectedShop)
            router.push("/auth/register");
        }else{
            Alert.alert("Shop not found", "The specified shop does not exist. Please contact support.");
        }

    }

    const fetchCompanies = useCallback(async () => {
        return await fetchAllCompanies();
    }, []);

    const fetchRelatedShops = useCallback(async () => {
        if (company) {
            return await fetchShops(company);
        }
        return [];
    }, [company]);


    const { data: relatedShops, isSuccess: isShopsSuccess, error: shopsError } = useQuery({
        queryKey: ["shops", company],
        queryFn: fetchRelatedShops,
        enabled: !!company,
    });


    const { data: companiesData, isLoading: isCompaniesLoading, isSuccess: isCompaniesSuccess, error: companiesError } = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });
    useEffect(() => {
        if (isCompaniesSuccess && companiesData) {
            setCompanies(companiesData);
        }
        if (companiesError) {
            console.error("Error fetching companies:", companiesError);
        }
    }, [isCompaniesSuccess, companiesData, companiesError, queryClient, router, companies, setCompanies]);

    useEffect(() => {
        if (isShopsSuccess && relatedShops) {
            setShops(relatedShops);
        }
        if (shopsError) {
            console.error("Error fetching shops:", shopsError);
        }
    }, [isShopsSuccess, relatedShops, shopsError]);


    if(isCompaniesLoading) {
        return (
            <View style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 30}}>
                <Button
                    title="Solid"
                    type="outline"
                    loading
                    buttonStyle={{borderWidth: 0}}
                    loadingProps={{size: 60, color: commonColors.primaryColor,}}
                />
            </View>
        )
    }

    return (
        <ParentContainer>
            <View style={{paddingVertical: 25, paddingHorizontal: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: 6}}>
                <Text style={{fontSize: 25, color: theme.textPrimary}}>
                    Shop
                </Text>
            </View>
            <View style={styles.dropdownContainer}>
                <Label title="Select Company" />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={companies.map(c => ({ label: c.company_name, value: c.id }))}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select comapany"
                    searchPlaceholder="Search company ..."
                    value={company}
                    onChange={item => { setCompany(item.value); }}
                    renderLeftIcon={() => (
                        <Icon
                            name="apartment" type='material' size={23}
                            style={styles.icon} color={theme.textSecondary}
                        />
                    )}
                    renderItem={(company) => RenderItem({ label: company.label, value: company.value }, company.value)}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <Label title="Select shop" />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={shops.map(s =>({ label: s.location, value: s.id }))}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select shop"
                    searchPlaceholder="Search shop ..."
                    value={selectedShopId}
                    onChange={item => {setSelectedShopId(item.value)}}
                    renderLeftIcon={() => (
                        <Icon
                            name="shop" type='material' size={23}
                            style={styles.icon} color={theme.textSecondary}
                        />
                    )}
                    renderItem={(shop)=>RenderItem({label: shop.label, value: shop.value}, shop.value)}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <PrimaryButton
                    title="Save"
                    disabled={!company || !selectedShopId}
                    actionOnPress={() =>saveShop()}
                    width='100%'
                />
            </View>
        </ParentContainer>
    );
}

export default ShopSetup;

