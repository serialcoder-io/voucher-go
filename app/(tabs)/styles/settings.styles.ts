import {Theme} from "@/lib/definitions";
import {StyleSheet} from "react-native";

export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.background,
        paddingVertical: 20,
        paddingHorizontal: 18,
        width: '100%',
    },
    card: {
        borderWidth: 0,
        borderRadius: 10,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 3
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    optionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingTop: 25,
        paddingLeft: 10
    },
    sectionTitleText: {
        fontSize: 16,
        fontWeight: '100',
        color: theme.textPrimary
    },
    profileSettinDropdown: {
        width: "100%",
        paddingLeft: 20
    },
    profileSettingsConainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
});