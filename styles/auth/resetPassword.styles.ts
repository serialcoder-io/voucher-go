import {Theme} from "@/types";
import {StyleSheet} from "react-native";

export const getStyles = (theme: Theme) =>
    StyleSheet.create({
        subtitle: {
            fontSize: 15,
            color: theme.textSecondary,
            marginBottom: 20,
            textAlign: 'center',
            fontStyle: 'italic',
        },
    })