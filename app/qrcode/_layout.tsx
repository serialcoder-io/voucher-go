import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '@/store/theme';

function RootNavigator() {
    return (
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name="index" options={{headerShown: true, headerTitle: "Scanner"}} />
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
