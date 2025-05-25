import {Stack} from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/store/theme';
import { useTheme } from "@/hooks/useTheme";
import {queryClient} from "@/lib/queryClient";
import {QueryClientProvider} from '@tanstack/react-query'
import {AlertNotificationRoot} from "react-native-alert-notification";


function RootNavigator() {
    const { themeMode, theme } = useTheme();
    const themeKey = themeMode === 'auto' ? themeMode : 'fixed';

    return (
        <Stack
            key={themeKey}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerShown: true,
                    headerTitle: "Register",
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />
            <Stack.Screen
                name="resetPassword"
                options={{
                    headerShown: true,
                    headerTitle: "Reset password",
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
