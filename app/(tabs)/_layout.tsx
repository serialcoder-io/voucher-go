import * as React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomTabBarIcon from "@/components/ui/custom-tabBarIcon";
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import HeaderRightAvatar from "@/components/ui/headerRight-avatar";

export default function MainLayout() {
    return (
        <SafeAreaProvider>
            <Tabs screenOptions={screenOptions}>
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: true,
                        headerTitle: '',
                        headerLeft: () => (
                            <View style={{ paddingLeft: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                {/* Logo à gauche */}
                                <Text style={{fontSize: 18, paddingLeft: 18, fontWeight: 'bold'}}>Voucher Go</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <HeaderRightAvatar />
                        ),
                        title: 'Home',
                        tabBarIcon: ({ focused, color}) => (
                            <CustomTabBarIcon iconName="home" color={color} focused={focused} />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ marginTop: focused ? 5 : 0 }}>Home</Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="transactions"
                    options={{
                        headerShown: true,
                        title: 'Transactions',
                        headerRight: () => (
                            <HeaderRightAvatar />
                        ),
                        tabBarIcon: ({ focused, color}) => (
                            <CustomTabBarIcon iconName="receipt-outline" color={color} focused={focused} />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ marginTop: focused ? 5 : 0 }}>Transactions</Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        headerShown: true,
                        title: 'Settings',
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
                            <Text style={{ marginTop: focused ? 5 : 0 }}>Settings</Text>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
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