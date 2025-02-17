import * as React from 'react';
import { Tabs } from 'expo-router';
import { Text, Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomTabBarIcon from "@/components/ui/settings/custom-tabBarIcon";
import HeaderRightAvatar from "@/components/ui/_layout/headerRight-avatar";
import {ThemeProvider} from "@/store/theme";
import {useTheme} from "@/hooks/useTheme";
import {Theme} from '@/lib/definitions'

function TabBarLabel({focused, theme, text}: {focused: boolean, theme: Theme, text: string}) {
    return(
        <Text style={{ marginTop: focused ? 5 : 0, color: theme.textPrimary, fontSize: 13 }}>{text}</Text>
    )
}

function RootNavigator() {
    const {theme} = useTheme();
    return(
        <Tabs screenOptions={{
            tabBarStyle: {
                height: 75,
                backgroundColor: theme.backgroundSecondary,
                borderColor: theme.backgroundSecondary,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                color: theme.textPrimary,
            },
            tabBarIconStyle: {
                marginTop: 14,
                justifyContent: 'center',
                alignItems: 'center',
                color: theme.textPrimary,
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: 'Home',
                    headerTitle: 'Redemption',
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
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon iconName="home" color={theme.textPrimary} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <TabBarLabel focused={focused} theme={theme} text='Home' />
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
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon iconName="receipt-outline" color={theme.textPrimary} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <TabBarLabel focused={focused} theme={theme} text='Transactions' />
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
                    tabBarIcon: ({ focused}) => (
                        <CustomTabBarIcon
                            iconName={Platform.OS === 'ios' ? 'cog' : 'settings-outline'}
                            color={theme.textPrimary}
                            focused={focused}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <TabBarLabel focused={focused} theme={theme} text='Settings' />
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

