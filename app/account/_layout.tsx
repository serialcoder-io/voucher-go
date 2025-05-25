import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';
import {useTheme} from "@/hooks/useTheme";
import {AlertNotificationRoot} from "react-native-alert-notification";
import { queryClient } from "@/lib/queryClient";
import {QueryClientProvider} from '@tanstack/react-query'

function RootNavigator() {
    const {theme} = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* welcom screen only displayed on first lunch */}

            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: 'Profile',
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />
            <Stack.Screen
                name="change-password"
                options={{
                    headerShown: true,
                    headerTitle: "Change password",
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />

        </Stack>
    );
}

export default function RootLayout() {
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
