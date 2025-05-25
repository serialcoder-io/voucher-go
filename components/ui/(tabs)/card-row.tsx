import {StyleSheet, View} from "react-native";
import {Icon, Text} from "@rneui/themed";
import React from "react";
import {Theme} from "@/types";
import {useTheme} from "@/hooks/useTheme";

type CardRowProps = {
    iconName: string;
    label: string;
    value: string | number;
}

function CardRow({iconName, label, value,}: CardRowProps){
    const {theme} = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View style={styles.optionRow} >
                <Icon
                    name={iconName} type='material' size={20}
                    style={{marginRight: 4}} color={theme.textSecondary}
                />
                <Text style={{color: theme.textPrimary, fontSize: 14}}>{label} :</Text>
            </View>
            <Text style={styles.rowText}>{value}</Text>
        </View>
    )
}
export default CardRow;

const getStyles = (theme: Theme) => StyleSheet.create({
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 5,
        paddingVertical: 15,
    },
    refRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 15,
        paddingVertical: 15,
    },
    rowText:{color: theme.textSecondary, fontSize: 14},
});