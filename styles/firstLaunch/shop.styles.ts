import {Theme} from "@/types";
import {StyleSheet} from "react-native";

export const getStyles = (theme: Theme)=> StyleSheet.create({
    dropdown: {
        margin: 16, height: 50,
        marginVertical: 6,
        width: "100%", elevation: 2,
        backgroundColor: theme.backgroundSecondary,
        borderRadius: 12, paddingHorizontal: 12,
    },
    dropdownContainer: {
        width:'100%', display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: theme.textPrimary,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.textPrimary,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    label:{
        alignSelf: "flex-start",
        paddingLeft: 10, fontSize: 16,
        color: theme.textPrimary,
    },
    backButton: {
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "flex-start"
    }
});