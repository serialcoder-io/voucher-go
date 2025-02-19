import {Stack} from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/store/theme';
import { useTheme } from "@/hooks/useTheme";

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
                name="reset-password"
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
    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <RootNavigator />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
