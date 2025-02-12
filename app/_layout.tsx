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
                  name="login"
                  options={{
                      headerShown: false,
                      headerTitle: 'Login',
                      headerStyle: {
                          backgroundColor: '#1e90ff',
                      },
                      headerTintColor: '#fff',
                  }}
              />
              <Stack.Screen
                  name="signup"
                  options={{
                      headerShown: true,
                      headerTitle: 'Rgister',
                      headerStyle: {
                          backgroundColor: 'white', // Couleur spécifique pour l'écran de signup
                      },
                      headerTintColor: 'black',
                  }}
              />
              <Stack.Screen
                  name="index"
                  options={{
                      headerShown: false,
                      headerTitle: 'Welcome Home',
                      headerStyle: {
                          backgroundColor: '#32cd32', // Couleur spécifique pour l'écran de home
                      },
                      headerTintColor: '#fff',
                  }}
              />
              <Stack.Screen
                  name="reset-password"
                  options={{
                      headerShown: true,
                      headerTitle: 'Reset password',
                      headerStyle: {
                          backgroundColor: 'white', // Couleur spécifique pour l'écran de home
                      },
                      headerTintColor: 'black',
                  }}
              />
          </Stack>
      </SafeAreaProvider>
  );
}
