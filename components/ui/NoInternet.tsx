import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Icône "wifi-off"
import { commonColors } from '@/constants/Colors';
import { useTheme } from "@/hooks/useTheme";

const NoInternetScreen = ({ onRetry }: { onRetry: () => void }) => {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return (
        <View style={styles.container}>
        <MaterialIcons name="wifi-off" size={80} color="#ccc" />
        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.subtitle}>Please check your connection and try again.</Text>
        <TouchableOpacity style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
        </View>
    );
};

export default NoInternetScreen;


export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
    color: theme.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: commonColors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: theme.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
});