import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 15,
    },
    userIcon: {
        width: "60%",
        height: "60%",
        resizeMode: "contain",
        alignSelf: "center",
    },
    iconContainer:{
        width: 90,
        height: 90,
        borderRadius: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    }
});