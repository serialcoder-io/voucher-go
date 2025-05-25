import {styles} from "@/styles/voucher/scan.styles";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useCameraPermissions} from "expo-camera";

function RequestPermissionsView() {
    const [permission, requestPermission] = useCameraPermissions();
    return (
        <View style={styles.permissionContainer}>
            <Text style={{ color: "white" }}>We need your permission to access the camera</Text>
            <TouchableOpacity
                style={styles.permissionButton}
                onPress={() => requestPermission()}
            >
                <Text style={{ color: "white" }}>Grant Permission</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RequestPermissionsView;