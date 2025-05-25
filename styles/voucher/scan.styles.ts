import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
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