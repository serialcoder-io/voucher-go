import {GestureResponderEvent, StyleSheet, TouchableOpacity} from "react-native";
import {Card, Divider, Icon, Text} from "@rneui/themed";
import React from "react";

type PressableProps = {
    text: string;
    iconName: string;
    iconType: string;
    actionOnPress?: (event: GestureResponderEvent) => void;
}

function CustomPressable({text, iconName, iconType, actionOnPress}: PressableProps) {
    return (
        <TouchableOpacity style={styles.pressable} onPress={actionOnPress}>
            <Icon name={iconName} type={iconType} size={20} style={styles.icon} />
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default CustomPressable;

const styles = StyleSheet.create({
    pressable:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
    },
    icon: {
        marginRight: 10,
    },
});