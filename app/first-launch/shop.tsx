import ParentContainer from "@/components/parent-container";
import {View, Text, StyleSheet, Pressable, Alert} from "react-native";
import React, {useCallback, useEffect, useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import {Button, Icon} from "@rneui/themed";
import {useTheme} from "@/hooks/useTheme";
import {Company, Shop, Theme} from "@/types";
import PrimaryButton from "@/components/ui/primary-button";
import {useRouter} from "expo-router";
import RenderItem from "@/components/ui/shop/render-item";
import {fetchAllCompanies, fetchShops} from "@/lib/services/company";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient";
import {commonColors} from "@/constants/Colors";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

function Label({ title }: { title: string }) {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return <Text style={styles.label}>{title}</Text>;
}

function ShopSetup(){
    const [company, setCompany] = useState<number | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);
    const [location, setLocation] = useState(null);
    const {theme} = useTheme();
    const styles = getStyles(theme)
    const router = useRouter();

    const saveShop = async()=>{
        const shop = shops.find((shop) => shop.id === location);
        if(shop){
            await asyncStorage.setItem("shop", JSON.stringify(shop));
            await asyncStorage.setItem("first_launch", "1");
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
                    value={location}
                    onChange={item => {setLocation(item.value)}}
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
                    disabled={!company || !location}
                    actionOnPress={() =>saveShop()}
                    width='100%'
                />
            </View>
        </ParentContainer>
    );
}

export default ShopSetup;

const getStyles = (theme: Theme)=> StyleSheet.create({
    dropdown: {
        margin: 16, height: 50,
        marginVertical: 6,
        width: "100%", elevation: 2,
        backgroundColor: theme.backgroundSecondary,
        borderRadius: 12, paddingHorizontal: 12,
    },
    dropdownContainer: {
        width:'100%', display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: theme.textPrimary,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.textPrimary,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    label:{
        alignSelf: "flex-start",
        paddingLeft: 10, fontSize: 16,
        color: theme.textPrimary,
    },
    backButton: {
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "flex-start"
    }
});