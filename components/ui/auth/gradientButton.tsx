import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { commonColors } from '@/constants/Colors';

type GradientColors = [string, string, ...string[]];

type Props = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  gradientColors?: GradientColors;
};


const GradientButton = ({
  title,
  loading = false,
  disabled = false,
  onPress,
  style,
  gradientColors = [commonColors.primaryColor, '#772bc2'],
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[{ opacity: disabled ? 0.6 : 1 }, style]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  gradientContainer: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
