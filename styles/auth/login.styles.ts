import {Theme} from "@/types";
import {StyleSheet} from "react-native";
import {commonColors} from "@/constants/Colors";

export const getstyles = (theme: Theme) =>
    StyleSheet.create({
        logo: {
            width: 120,
            height: 120,
            marginBottom: 10,
            resizeMode: "contain",
        },
        optionsContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        },
        checkboxContainer: {
            backgroundColor: "transparent",
            borderWidth: 0,
        },
        forgotPassword: {
            color: commonColors.primaryColor,
            fontWeight: "bold",
            fontSize: 14,
            marginRight: 10
        },
        signupText: {
            marginTop: 16,
            fontSize: 15,
            color: theme.textSecondary,
        },
    });