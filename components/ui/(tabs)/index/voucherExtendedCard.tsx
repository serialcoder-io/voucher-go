import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Voucher } from '@/types';
import { formatDate } from '@/utils';

const ExtendedVoucherCard = ({ voucher }: { voucher: Voucher }) => {
  const now = new Date();
  const expiry = voucher.expiry_date ? new Date(voucher.expiry_date) : null;
  const extension = voucher.extention_date ? new Date(voucher.extention_date) : null;

  if (!expiry || now <= expiry) return null; // the voucher is still valid
  if (!extension || extension < now) return null; // extension null in passed

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <MaterialIcons name="schedule" size={28} color="#FFA500" style={styles.icon} />
        <Text style={styles.title}>Voucher extended</Text>
      </View>
      <Text style={styles.text}>
        The original expiry date ({formatDate(voucher.expiry_date!)}) has passed, but this voucher was extended.
      </Text>
      <Text style={styles.validUntil}>Valid until: <Text style={styles.date}>{formatDate(voucher.extention_date!)}</Text>
      </Text>
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
  titleRow: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 3
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
    color: 'red',
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
