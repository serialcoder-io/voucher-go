import ParentContainer from "@/components/parent-container";
import {View, Text, StyleSheet, Pressable} from "react-native";
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Icon} from "@rneui/themed";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";
import PrimaryButton from "@/components/ui/primary-button";
import {useRouter} from "expo-router";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

function Label({ title }: { title: string }) {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return <Text style={styles.label}>{title}</Text>;
}

function ShopSetup(){
    const [company, setCompany] = useState(null);
    const [location, setLocation] = useState(null);
    const {theme} = useTheme();
    const styles = getStyles(theme)
    const router = useRouter();

    const renderItem = (item: {label: string, value: string}, valueName: string) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === valueName && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select comapany"
                    searchPlaceholder="Search company ..."
                    value={company}
                    onChange={item => {setCompany(item.value)}}
                    renderLeftIcon={() => (
                        <Icon
                            name="apartment" type='material' size={23}
                            style={styles.icon} color={theme.textSecondary}
                        />
                    )}
                    renderItem={(item)=>renderItem({label: item.label, value: item.value}, "company")}
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
                    data={data}
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
                    renderItem={(item)=>renderItem({label: item.label, value: item.value}, "location")}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <PrimaryButton
                    title="Save"
                    disabled={!company || !location}
                    actionOnPress={() =>console.log(company + " " + location)}
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
    item: {
        padding: 17, flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1, fontSize: 16,
        color: "black",
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