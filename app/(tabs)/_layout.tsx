import * as React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomTabBarIcon from "@/components/ui/settings/custom-tabBarIcon";
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import HeaderRightAvatar from "@/components/ui/_layout/headerRight-avatar";
import {ThemeProvider, useTheme} from "@/store/theme";


function RootNavigator() {
    const {theme} = useTheme();
    return(
        <Tabs screenOptions={{
            tabBarStyle: {
                height: 75,
                backgroundColor: theme.backgroundSecondary,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                color: theme.textPrimary,

            },
            tabBarIconStyle: {
                marginTop: 14,
                justifyContent: 'center',
                alignItems: 'center',
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerTitle: 'Voucher Go',
                    headerTintColor: theme.textPrimary,
                    headerTitleStyle:{
                        fontSize: 18, paddingLeft: 18, fontWeight: 'bold'
                    },
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerRight: () => (
                        <HeaderRightAvatar />
                    ),
                    title: 'Home',
                    tabBarIcon: ({ focused, color}) => (
                        <CustomTabBarIcon iconName="home" color={color} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ marginTop: focused ? 5 : 0, color: theme.textPrimary }}>Home</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    headerShown: true,
                    title: 'Transactions',
                    headerTintColor: theme.textPrimary,
                    headerTitleStyle:{
                        fontSize: 18, paddingLeft: 18, fontWeight: 'bold'
                    },
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerRight: () => (
                        <HeaderRightAvatar />
                    ),
                    tabBarIcon: ({ focused, color}) => (
                        <CustomTabBarIcon iconName="receipt-outline" color={color} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ marginTop: focused ? 5 : 0, color: theme.textPrimary }}>Transactions</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: true,
                    title: 'Settings',
                    headerTintColor: theme.textPrimary,
                    headerTitleStyle:{
                        fontSize: 18, paddingLeft: 18, fontWeight: 'bold'
                    },
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerRight: () => (
                        <HeaderRightAvatar />
                    ),
                    tabBarIcon: ({ focused, color}) => (
                        <CustomTabBarIcon
                            iconName={Platform.OS === 'ios' ? 'cog' : 'settings-outline'}
                            color={color}
                            focused={focused}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ marginTop: focused ? 5 : 0, color: theme.textPrimary }}>Settings</Text>
                    ),
                }}
            />
        </Tabs>
    )
}
export default function MainLayout() {
    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <RootNavigator />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}


const screenOptions: BottomTabNavigationOptions = {
    tabBarStyle: {
        height: 75,
        backgroundColor: 'white',
    },
    tabBarLabelStyle: {
        fontSize: 12,
        color: 'black',
    },
    tabBarIconStyle: {
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
}