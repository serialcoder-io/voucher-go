import React, {useEffect, useState} from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Icon } from "@rneui/themed";
import {useGlobalRef} from "@/store/reference";


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
            console.log("scannedData : " + data);
            setGlobalRef(data);
            setIsScanningDisabled(false);
            setCameraActive(false);
        }, 2000);
    };
// Utilise un useEffect pour gérer la redirection une fois que l'état est mis à jour
    useEffect(() => {
        if (globalRef) {
            router.back();
        }
    }, [globalRef]);

    if (!permission) return <View />;

    if (permission.status !== "granted") {
        return (
            <View style={styles.permissionContainer}>
                <Text style={{ color: "white" }}>We need your permission to access the camera</Text>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={() => requestPermission()} // Demander la permission lorsque l'utilisateur appuie
                >
                    <Text style={{ color: "white" }}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
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
                        {/* Bouton Flash */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setEnableTorch(!enableTorch)}
                        >
                            <Icon name={enableTorch ? "flashlight-off" : "flashlight-on"} size={30} color="white" />
                        </TouchableOpacity>

                        {/* Bouton Fermer */}
                        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    frame: {
        width: "85%",
        height: "55%",
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 15,
        borderStyle: "solid",
    },
    frameContainer: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsContainer: {
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 15,
        borderRadius: 50,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    permissionButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
    },
});
