import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';
import {useTheme} from "@/hooks/useTheme";
import {queryClient} from "@/lib/queryClient";
import {QueryClientProvider} from '@tanstack/react-query'
import {AlertNotificationRoot} from "react-native-alert-notification";

function RootNavigator() {
    const {theme} = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerTitle: "Redeem voucher",
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />
            <Stack.Screen name="scan" options={{headerShown: true, headerTitle: "Scanner"}} />
        </Stack>
    );
}

export default function RootLayout() {
    const {theme} = useTheme();
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
