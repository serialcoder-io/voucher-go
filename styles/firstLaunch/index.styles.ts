import {StyleSheet} from "react-native";
import {Theme} from "@/types";

export const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
        },
        logoContainer: {
            marginBottom: 40,
        },
        logo: {
            width: 130,
            height: 100,
        },
        welcomeText: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            color: theme.textPrimary,
        },
        subText: {
            fontSize: 15,
            textAlign: "center",
            marginBottom: 30,
            paddingHorizontal: 20,
            color: theme.textSecondary,
        },
    });
