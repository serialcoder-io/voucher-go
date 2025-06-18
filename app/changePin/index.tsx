import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/types';
import { commonColors } from '@/constants/Colors';
import { router } from 'expo-router';

const PinChangeNotAllowedScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <MaterialIcons name="lock" size={80} color="#ccc" />
      <Text style={styles.title}>PIN Change Not Allowed</Text>
      <Text style={styles.subtitle}>
        For security reasons, PIN changes cannot be done from within the app.
      </Text>
      <Text style={styles.info}>
        To update your PIN, please reset the app from your device settings and reconfigure it.
      </Text>

      <TouchableOpacity style={styles.button} onPress={()=>router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinChangeNotAllowedScreen;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
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
    info: {
      fontSize: 15,
      color: '#999',
      marginTop: 12,
      textAlign: 'center',
    },
    button: {
      marginTop: 28,
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
