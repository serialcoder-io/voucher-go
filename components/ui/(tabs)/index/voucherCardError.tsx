import {Pressable, StyleSheet, View} from "react-native";
import {Card, Divider, Icon, Text} from "@rneui/themed";
import React from "react";
import {Theme} from "@/types";

type VoucherCardErrorProps = {
    theme: Theme;
    reference: string
    resetState: () => void;
    iconName: string;
    title?: string;
    message: string;
}

function VoucherCardError({
    theme,
    reference,
    resetState,
    iconName,
    title,
    message,
}: VoucherCardErrorProps) {
    const styles = getStyles(theme);
    return (
        <Card containerStyle={styles.card}>
            <View style={styles.closeButtonContainer}>
                <Pressable  hitSlop={20} onPress={resetState}>
                    <Icon name='close' type='material' color={theme.textPrimary} size={26} style={{marginRight: 10}} />
                </Pressable>
            </View>
            <View>
                <View style={styles.titleContainer}>
                    <Icon name={iconName} type='material' color="red" size={35} />
                    <Text style={{fontSize: 17, color: "red"}}>{title}</Text>
                </View>
                <View style={styles.refRow}>
                    <Icon
                        name='tag' type='material' color={theme.textSecondary} size={26}
                        style={{marginRight: 10}}
                    />
                    <Text style={{color: theme.textSecondary}}>Ref:  {reference}</Text>
                </View>
            </View>
            <Divider />
            <View style={{paddingTop: 10}}>
                <Text style={{fontSize: 16, color: theme.textSecondary}}>{message}</Text>
            </View>
        </Card>
    )
}

export default VoucherCardError;


const getStyles = (theme: Theme) => StyleSheet.create({
    card: {
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 20,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 3
    },
    refRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 15,
        paddingVertical: 15,
    },
    refText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    closeButtonContainer:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
});