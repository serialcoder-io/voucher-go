import * as React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from "react-native";

export default function MainLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 75,
                    backgroundColor: '#EDE8FF',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    color: 'grey',
                },
                tabBarIconStyle: {
                    marginTop: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <Tabs.Screen
                name="login"
                options={{
                    headerShown: false,
                    title: 'Sign in',
                    tabBarIcon: ({ focused, color, size }) => (
                        <View
                            style={[
                                styles.iconContainer,
                                { backgroundColor: focused ? '#5F33E1' : 'transparent' }
                            ]}
                        >
                            <Ionicons
                                name="log-in"
                                size={25}
                                color={focused ? 'white' : color}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ marginTop: focused ? 5 : 0 }}>Sign in</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="signup"
                options={{
                    headerShown: false,
                    title: 'Signup',
                    tabBarIcon: ({ focused, color, size }) => (
                        <View
                            style={[
                                styles.iconContainer,
                                { backgroundColor: focused ? '#5F33E1' : 'transparent' }
                            ]}
                        >
                            <Ionicons
                                name="person-add"
                                size={25}
                                color={focused ? 'white' : color}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ marginTop: focused ? 5 : 0 }}>Sign up</Text>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center', // Centrer l'icône verticalement
        alignItems: 'center', // Centrer l'icône horizontalement
        width: 40, // Largeur du conteneur (ajuster selon besoin)
        height: 40, // Hauteur du conteneur (ajuster selon besoin)
        borderRadius: 10, // Bord arrondi pour l'icône
        marginBottom: 5, // Marges supplémentaires pour éviter le débordement
    },
});
