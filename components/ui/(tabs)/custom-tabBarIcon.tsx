import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, View} from "react-native";
import * as React from "react";
import {TabBarIconProps} from "@/lib/definitions";
import {commonColors} from "@/constants/Colors";

function CustomTabBarIcon({iconName, focused, color}: TabBarIconProps) {
    return (
        <View
            style={[
                styles.iconContainer,
                { backgroundColor: focused ? commonColors.primaryColor : 'transparent' }
            ]}
        >
            <Ionicons
                name={iconName}
                size={25}
                color={focused ? 'white' : color}
            />
        </View>
    )
}

export default CustomTabBarIcon;

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 10,
        marginBottom: 5,
    },
});