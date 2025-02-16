import {StyleSheet, TouchableOpacity} from "react-native";
import {Icon, Text} from "@rneui/themed";
import React from "react";
import {PressableProps} from "@/lib/definitions";
import {useTheme} from "@/store/theme";
import {useGlobalStyles} from "@/styles/global";

function CustomPressable({
    text,
    iconName,
    iconType,
    onPress
}: PressableProps): React.ReactElement<PressableProps> {
    const styles = stylesheet();
    const {theme} = useTheme();
    return (
        <TouchableOpacity style={styles.pressable} onPress={onPress}>
            <Icon name={iconName} type={iconType} size={20} style={useGlobalStyles().icon} color={theme.textSecondary} />
            <Text style={useGlobalStyles().textPrimary}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CustomPressable;

const stylesheet = () =>{
    return StyleSheet.create({
        pressable: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 15,
        },
    })
}

