import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';
import {useTheme} from "@/hooks/useTheme";
import {queryClient} from "@/lib/queryClient";
import {QueryClientProvider} from '@tanstack/react-query'

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
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />
            <Stack.Screen
                name="access-code"
                options={{
                    headerShown: true,
                    headerTitle: "Setup",
                    headerBackVisible: false,
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />
            <Stack.Screen
                name="shop"
                options={{
                    headerShown: true,
                    headerTitle: "Setup",
                    headerTitleStyle:{fontSize: 25, color: theme.textPrimary},
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
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <SafeAreaProvider>
                    <RootNavigator />
                </SafeAreaProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
