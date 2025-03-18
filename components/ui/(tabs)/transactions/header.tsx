import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed"
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";

function Header() {
    const {theme} = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.titleContainer}>
            <Ionicons
                name="gift"
                size={35}
                color="white" />
            <Text style={styles.title}>Redemptions</Text>
        </View>
    )
}

export default Header;

const getStyles = (theme: Theme) => StyleSheet.create({
    titleContainer: {
        backgroundColor: commonColors.primaryColor,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title:{
        fontSize: 22,
        fontWeight: "bold",
        color: "white"
    }
});