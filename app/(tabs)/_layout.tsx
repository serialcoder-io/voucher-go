import * as React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Avatar} from "@rneui/base";

export default function MainLayout() {
    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        height: 75,
                        backgroundColor: 'white',
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: 'black',
                    },
                    tabBarIconStyle: {
                        marginTop: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: true, // Active le header
                        headerTitle: '',  // Enlever le titre par défaut
                        headerLeft: () => (
                            <View style={{ paddingLeft: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                {/* Logo à gauche */}
                                <Text style={{fontSize: 18, paddingLeft: 18, fontWeight: 'bold'}}>Voucher Go</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ paddingRight: 20 }}>
                                {/* Avatar à droite */}
                                <Avatar
                                    size={40}
                                    rounded
                                    title="A"
                                    containerStyle={{ backgroundColor: "#4c8bf5" }}
                                />
                            </View>
                        ),
                        title: 'Home',
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: focused ? '#4c8bf5' : 'transparent' }
                                ]}
                            >
                                <Ionicons
                                    name="home-outline"
                                    size={25}
                                    color={focused ? 'white' : color}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ marginTop: focused ? 5 : 0 }}>Home</Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="transactions"
                    options={{
                        headerShown: true,
                        title: 'Transactions',
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: focused ? '#4c8bf5' : 'transparent' }
                                ]}
                            >
                                <Ionicons
                                    name="receipt-outline"
                                    size={25}
                                    color={focused ? 'white' : color}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ marginTop: focused ? 5 : 0 }}>Transactions</Text>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        headerShown: true,
                        title: 'Settings',
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: focused ? '#4c8bf5' : 'transparent' }
                                ]}
                            >
                                <Ionicons
                                    name={Platform.OS === 'ios' ? 'cog' : 'settings-outline'}
                                    size={30}
                                    color={focused ? 'white' : color}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ marginTop: focused ? 5 : 0 }}>Settings</Text>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
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
