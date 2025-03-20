import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/lib/definitions";

const TransactionCard = ({ amount = '500 Rs', date = 'Today', refNumber = 'VR-0000019-27/30' }) => {
    const {theme} = useTheme();
    const styles = getStyles(theme)
    return (
        <View style={styles.card}>
            {/* Ligne du montant et de la date */}
            <View style={styles.topRow}>
                <View style={styles.amountContainer}>
                    <MaterialIcons name="payments" size={20} color="#4CAF50" />
                    <Text style={styles.amount}>{amount}</Text>
                </View>
                <Text style={styles.date}>{date}</Text>
            </View>

            {/* Référence du paiement */}
            <Text style={styles.refNumber}>{refNumber}</Text>
        </View>
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
