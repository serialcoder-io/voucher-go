import {Icon, Text} from "@rneui/themed";
import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles/global";


function LanguageOption({ label, value }: {label: string, value: string}) {
    const [language, setLanguage] = useState('FR');
    const {theme} = useTheme();
    return (
        <TouchableOpacity onPress={() => setLanguage(value)} style={styles.optionRow}>
            <Text style={useGlobalStyles().textPrimary}>{label}</Text>
            <Icon name={language === value ? 'check-circle' : 'circle'} type='feather' color={theme.textSecondary} />
        </TouchableOpacity>
    )
}

export default LanguageOption;

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
});
