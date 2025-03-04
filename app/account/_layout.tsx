import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';
import {useTheme} from "@/hooks/useTheme";

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
                    title: 'Account',
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: true,
                    headerTitle: "Profile",
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
