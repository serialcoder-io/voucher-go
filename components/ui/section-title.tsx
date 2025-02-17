import {StyleSheet, View} from "react-native";
import {Icon, Text} from "@rneui/themed";
import React from "react";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {useGlobalStyles} from "@/styles/global";

type SectionTitleProps = {
    title: string, iconName: string
}

function SectionTitle({title, iconName}: SectionTitleProps) {
    const { theme } = useTheme();
    const globalStyles = useGlobalStyles();
    const currentStyles = styles(theme);
    return (
        <View style={currentStyles.sectionTitle}>
            <Icon name={iconName} type='material' size={20} style={globalStyles.icon} color={theme.textPrimary} />
            <Text style={currentStyles.sectionTitleText}>{title}</Text>
        </View>

    )
}

export default SectionTitle;

const styles = (theme: Theme) => StyleSheet.create({
    sectionTitle: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingTop: 25,
        paddingLeft: 10
    },
    sectionTitleText: {
        fontSize: 16,
        fontWeight: '100',
        color: theme.textPrimary
    },
});
