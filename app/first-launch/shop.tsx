import ParentContainer from "@/components/parent-container";
import {View, Text, StyleSheet, Pressable} from "react-native";
import React, {useCallback, useEffect, useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import {Button, Icon} from "@rneui/themed";
import {useTheme} from "@/hooks/useTheme";
import {Company, Theme} from "@/lib/definitions";
import PrimaryButton from "@/components/ui/primary-button";
import {useRouter} from "expo-router";
import RenderItem from "@/components/ui/shop/render-item";
import {fetchAllCompanies} from "@/lib/services/company";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient";
import {commonColors} from "@/constants/Colors";

function Label({ title }: { title: string }) {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return <Text style={styles.label}>{title}</Text>;
}

function ShopSetup(){
    const [company, setCompany] = useState(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [shops, setShops] = useState([]);
    const [location, setLocation] = useState(null);
    const {theme} = useTheme();
    const styles = getStyles(theme)
    const router = useRouter();

    const saveShop = async()=>{
        console.log("Saving...");
    }

    const fetchCompanies = useCallback(async () => {
        return await fetchAllCompanies();
    }, []);

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setCompanies(data);
            console.log(companies)
        }
        if (error) {
            console.error("Error fetching companies:", error);
        }
    }, [isSuccess, data, error, queryClient, router, companies, setCompanies]);

    if(isLoading){
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
                    data={shops}
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
                    renderItem={(item)=>RenderItem({label: item.label, value: item.value}, "location")}
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
            <View style={{width:'100%', paddingLeft: 10}}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Icon
                        name="keyboard-backspace" type='material' size={33}
                        style={styles.icon} color={theme.textSecondary}
                    />
                    <Text style={{fontSize: 18, color: theme.textSecondary}}>Back</Text>
                </Pressable>
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