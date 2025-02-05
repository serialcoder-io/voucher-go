import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
          <Stack.Screen
              name="login"
              options={{
                  headerShown: false,
                  headerTitle: 'Login',
                  headerStyle: {
                      backgroundColor: '#1e90ff', // Couleur spécifique pour l'écran de login
                  },
                  headerTintColor: '#fff',
              }}
          />
          <Stack.Screen
              name="signup"
              options={{
                  headerShown: true,
                  headerTitle: 'Create Your Account',
                  headerStyle: {
                      backgroundColor: '#ff6347', // Couleur spécifique pour l'écran de signup
                  },
                  headerTintColor: '#fff',
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
      </Stack>
  );
}
