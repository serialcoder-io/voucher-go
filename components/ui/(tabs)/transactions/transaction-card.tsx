import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/types";

type TransactionCardProps = {
    amount: number | string;
    date: string;
    refNumber: string
}

const TransactionCard = ({
    amount,
    date,
    refNumber
}: TransactionCardProps) => {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    const redemptionDate = new Date(date.replace(/(\+\d{2}:\d{2})/, '')).toISOString().split('T')[0];
    const dateTodisplay = formatRedemptionDate(redemptionDate);

    return (
        <TouchableOpacity style={styles.card} onPress={()=>console.log(refNumber)}>
            <View style={styles.topRow}>
                <View style={styles.amountContainer}>
                    <MaterialIcons name="payments" size={20} color="#4CAF50" />
                    <Text style={styles.amount}>{amount} Rs</Text>
                </View>
                <Text style={styles.date}>{dateTodisplay}</Text>
            </View>
            <Text style={styles.refNumber}>{refNumber}</Text>
        </TouchableOpacity>
    );
};

const getStyles = (theme: Theme)=> StyleSheet.create({
    card: {
        backgroundColor: theme.backgroundSecondary,
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 1,
        marginVertical: 5,
        width: '100%',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    date: {
        fontSize: 14,
        color: theme.textSecondary,
    },
    refNumber: {
        fontSize: 14,
        color: theme.textSecondary,
        marginTop: 5,
    },
});

export default TransactionCard;


/**
 * Retourne un affichage lisible de la date : "Today", "Yesterday", ou "YYYY-MM-DD"
 * @param redemptionDate - La date de rédemption en format ISO string
 * @returns string
 */
export function formatRedemptionDate(redemptionDate: string): string {
    const toYMD = (d: Date): string => d.toISOString().split('T')[0];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const redemption = new Date(redemptionDate);

    const redemptionYMD = toYMD(redemption);
    const todayYMD = toYMD(today);
    const yesterdayYMD = toYMD(yesterday);

    if (redemptionYMD === todayYMD) {
        return "Today";
    } else if (redemptionYMD === yesterdayYMD) {
        return "Yesterday";
    } else {
        return redemptionYMD;
    }
}

