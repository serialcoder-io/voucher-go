import React from 'react'
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Icon, Text} from "@rneui/themed";
import {globalStyles} from "@/styles/global";
import {ThemeOptionsProps} from "@/lib/definitions";

function ThemeOptions({
  label,
  value,
  icon,
  type='feather',
  theme,
  setTheme
}: ThemeOptionsProps ): React.ReactNode {
    return (
        <TouchableOpacity onPress={() => setTheme(value)} style={styles.optionRow}>
            <View style={styles.optionLabel}>
                <Icon name={icon} type={type} size={20} style={globalStyles.icon} />
                <Text>{label}</Text>
            </View>
            <Icon name={theme === value ? 'check-circle' : 'circle'} type='feather' color={theme === value ? '#6200EE' : '#CCC'} />
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