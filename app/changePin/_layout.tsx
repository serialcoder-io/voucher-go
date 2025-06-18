import {Stack, usePathname} from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';
import {useTheme} from "@/hooks/useTheme";
import {AlertNotificationRoot} from "react-native-alert-notification";

function RootNavigator() {
    const {theme} = useTheme();


    return (
        <AlertNotificationRoot theme={theme.mode}>
            <Stack
                screenOptions={{
                    headerShown: true,
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: true,
                        title: "Pin",
                        headerStyle: {
                            backgroundColor: theme.backgroundSecondary,
                        },
                        headerTintColor: theme.textPrimary,
                    }}
                />
            </Stack>
        </AlertNotificationRoot>
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
