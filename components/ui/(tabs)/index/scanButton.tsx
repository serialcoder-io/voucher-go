import {TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon, Text} from "@rneui/themed";
import React from "react";
import {useTheme} from "@/hooks/useTheme";
import {useRouter} from "expo-router";

function ScanButton() {
    const {theme} = useTheme();
    const router = useRouter();
    return (
        <View style={{width: '100%', borderTopWidth: 0.5, borderTopColor: 'grey'}}>
            <TouchableOpacity style={styles.scanButton} onPress={()=>router.push('/voucher/scan')}>
                <Icon name="qrcode" size={25} color={theme.textPrimary} type="font-awesome" />
                <Text style={{fontSize: 16, color: theme.textPrimary}}>Scan the QR code</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ScanButton;

const styles = StyleSheet.create({
    scanButton: {
        width:'100%', display: "flex", flexDirection: "row",
            alignItems: "center", columnGap: 15,
            paddingVertical: 15, paddingHorizontal: 18
    },
})