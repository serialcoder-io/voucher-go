import React, {useEffect, useState} from "react";
import { View, TouchableOpacity, Text} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Icon } from "@rneui/themed";
import {useGlobalRef} from "@/store/reference";
import {styles} from "@/styles/voucher/scan.styles";
import RequestPermissionsView from "@/components/ui/voucher/RequestPermissionsView";

export default function QRScanner() {
    const [enableTorch, setEnableTorch] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraActive, setCameraActive] = useState(true);
    const {globalRef, setGlobalRef} = useGlobalRef();
    const [isScanningDisabled, setIsScanningDisabled] = useState(false);
    const router = useRouter();

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        if (isScanningDisabled) return;

        setIsScanningDisabled(true);

        setTimeout(() => {
            setGlobalRef(data);
            setIsScanningDisabled(false);
            setCameraActive(false);
        }, 2000);
    };

    useEffect(() => {
        if (globalRef) {
            router.back();
        }
    }, [globalRef]);

    if (!permission) return <View />;

    if (permission.status !== "granted") {
        return <RequestPermissionsView />
    }

    return (
        <View style={styles.container}>
            {cameraActive && (
                <CameraView
                    style={styles.camera}
                    facing="back"
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={handleBarCodeScanned}
                    enableTorch={enableTorch}
                >
                    {/* Cadre pour le scan */}
                    <View style={styles.frameContainer}>
                        <View style={styles.frame} />
                    </View>

                    <View style={styles.buttonsContainer}>
                        {/* flash button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setEnableTorch(!enableTorch)}
                        >
                            <Icon name={enableTorch ? "flashlight-off" : "flashlight-on"} size={30} color="white" />
                        </TouchableOpacity>

                        {/* close button */}
                        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </View>
    );
}
