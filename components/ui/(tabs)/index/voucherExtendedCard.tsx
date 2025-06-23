import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // ou autre selon ta config

interface Props {
  expiryDate: string;
  extensionDate: string;
}

const ExtendedVoucherCard = ({ expiryDate, extensionDate }: Props) => {
  return (
    <View style={styles.card}>
      <MaterialIcons name="schedule" size={28} color="#FFA500" style={styles.icon} />
      <Text style={styles.title}>Voucher extended</Text>
      <Text style={styles.text}>
        The original expiry date ({expiryDate}) has passed, but this voucher was extended.
      </Text>
      <Text style={styles.validUntil}>Valid until: <Text style={styles.date}>{extensionDate}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 5,
    borderLeftColor: '#FFA500',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  validUntil: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    color: '#4CAF50',
  },
});

export default ExtendedVoucherCard;
