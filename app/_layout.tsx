import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {
  return (
      <SafeAreaProvider>
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
              {/*<Stack.Screen
                  name="login"
                  options={{
                      headerShown: false,
                  }}
              />*/}
              <Stack.Screen
                  name="signup"
                  options={{
                      headerShown: true,
                      headerTitle: 'Rgister',
                      headerStyle: {
                          backgroundColor: 'white',
                      },
                      headerTintColor: 'black',
                  }}
              />
              <Stack.Screen
                  name="reset-password"
                  options={{
                      headerShown: true,
                      headerTitle: 'Reset password',
                      headerStyle: {
                          backgroundColor: 'white',
                      },
                      headerTintColor: 'black',
                  }}
              />
          </Stack>
      </SafeAreaProvider>
  );
}
