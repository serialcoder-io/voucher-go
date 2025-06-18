import {useEffect}  from 'react';
import { Tabs, usePathname} from 'expo-router';
import { Text, Platform, BackHandler, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomTabBarIcon from "@/components/ui/(tabs)/customTabBarIcon";
import HeaderRightAvatar from "@/components/ui/_layout/headerRightAvatar";
import { ThemeProvider } from "@/store/theme";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from '@/types';
import {queryClient} from "@/lib/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {commonColors} from "@/constants/Colors";
import Header from "@/components/ui/(tabs)/transactions/header";
import { AlertNotificationRoot } from 'react-native-alert-notification';

function TabBarLabel({ focused, theme, text }: { focused: boolean, theme: Theme, text: string }) {
    return (
        <Text style={{ marginTop: focused ? 5 : 0, color: focused ? commonColors.primaryColor : theme.textPrimary, fontSize: 13 }}>
            {text}
        </Text>
    );
}

function RootNavigator() {
    const { theme } = useTheme();
    const pathname = usePathname();

    useEffect(() => {
        const backAction = () => {
                Alert.alert('Exit', 'Do you really want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'YES',
                        onPress: () => BackHandler.exitApp()
                    },
                ]);
                return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [pathname]);

    return (
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
                    headerTintColor: "white",
                    headerTitleStyle: { fontSize: 22, paddingLeft: 18, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: commonColors.primaryColor },
                    headerRight: () => <HeaderRightAvatar />,
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon iconName={focused ? "home" : "home-outline"} color={theme.textPrimary} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <TabBarLabel focused={focused} theme={theme} text="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    headerShown: true,
                    title: 'Vouchers',
                    headerTintColor: theme.textPrimary,
                    headerTitleStyle: { fontSize: 22, paddingLeft: 18, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: commonColors.primaryColor },
                    headerRight: () => <HeaderRightAvatar />,
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon iconName={focused ? "gift" : "gift-outline"} color={theme.textPrimary} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <TabBarLabel focused={focused} theme={theme} text="Redemptions" />
                    ),
                    header: () => (
                        <Header />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: true,
                    title: 'Settings',
                    headerTintColor: "white",
                    headerTitleStyle: { fontSize: 25, paddingLeft: 18, fontWeight: 'bold' },
                    headerStyle: { backgroundColor: commonColors.primaryColor },
                    tabBarIcon: ({ focused }) => (
                        <CustomTabBarIcon iconName={Platform.OS === 'ios' ? 'cog' : focused ? "settings" : "settings-outline"} color={theme.textPrimary} focused={focused} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <TabBarLabel focused={focused} theme={theme} text="Settings" />
                    ),
                }}
            />
        </Tabs>

    );
}

export default function MainLayout() {
    const {theme} = useTheme()
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <SafeAreaProvider>
                    <AlertNotificationRoot theme={theme.mode}>
                        <RootNavigator />
                    </AlertNotificationRoot>
                </SafeAreaProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
