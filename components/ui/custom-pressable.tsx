import {StyleSheet, TouchableOpacity} from "react-native";
import {Icon, Text} from "@rneui/themed";
import React from "react";
import {PressableProps} from "@/lib/definitions";

function CustomPressable({
    text,
    iconName,
    iconType,
    onPress
}: PressableProps): React.ReactElement<PressableProps> {
    return (
        <TouchableOpacity style={styles.pressable} onPress={onPress}>
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