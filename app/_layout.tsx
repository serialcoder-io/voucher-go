import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';
import {useTheme} from "@/hooks/useTheme";

function RootNavigator() {
    const { theme } = useTheme();

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
                }}
            />
            <Stack.Screen
                  name="login/index"
                  options={{
                      headerShown: false,
                  }}
              />
            <Stack.Screen
                name="register/index"
                options={{
                    headerShown: true,
                    headerTitle: "Register",
                    headerStyle: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    headerTintColor: theme.textPrimary,
                }}
            />

            {/* welcom screen only displayed on first lunch */}
            <Stack.Screen name="welcom/index" options={{ headerShown: false,}}/>

            <Stack.Screen
                name="reset-password/index"
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
