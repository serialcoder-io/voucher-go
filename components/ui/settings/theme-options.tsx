import React from 'react'
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Icon, Text} from "@rneui/themed";
import {useGlobalStyles} from "@/styles/global";
import {ThemeOptionsProps} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";

function ThemeOptions({
  label,
  value,
  icon,
  type='feather',
  themeMode,
  setTheme
}: ThemeOptionsProps ): React.ReactNode {
    const {theme} = useTheme();
    return (
        <TouchableOpacity onPress={() => setTheme(value)} style={styles.optionRow}>
            <View style={styles.optionLabel}>
                <Icon name={icon} type={type} size={20} style={useGlobalStyles().icon} color={theme.textPrimary} />
                <Text style={useGlobalStyles().textPrimary}>{label}</Text>
            </View>
            <Icon name={themeMode === value ? 'check-circle' : 'circle'} type='feather' color={ theme.textSecondary} />
        </TouchableOpacity>
    )
}

export default ThemeOptions;


const styles = StyleSheet.create({
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    optionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});