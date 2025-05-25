import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed"
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {Theme} from "@/types";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";

function HeaderTitle() {
    const {theme} = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.titleContainer}>
            <Ionicons
                name="gift"
                size={30}
                color="white" />
            <Text style={styles.title}>Redemptions</Text>
        </View>
    )
}

export default HeaderTitle;

const getStyles = (theme: Theme) => StyleSheet.create({
    titleContainer: {
        backgroundColor: commonColors.primaryColor,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
        justifyContent: "flex-start",
        paddingVertical: 5,
        paddingHorizontal:10,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});
