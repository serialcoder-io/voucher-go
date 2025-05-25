import {Theme} from "@/lib/definitions";
import {StyleSheet} from "react-native";

export const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loaderContainer: {
        paddingVertical: 20,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        color: theme.textPrimary,
    }
});