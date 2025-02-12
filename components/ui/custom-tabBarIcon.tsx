import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, View} from "react-native";
import * as React from "react";
import {Icon} from "@rneui/themed";
type TabBarIconProps = {
    iconName: keyof typeof Ionicons.glyphMap,
    focused: boolean,
    color: string,
}
function CustomTabBarIcon({iconName, focused, color}: TabBarIconProps) {
    return (
        <View
            style={[
                styles.iconContainer,
                { backgroundColor: focused ? '#4c8bf5' : 'transparent' }
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
        justifyContent: 'center', // Centrer l'icône verticalement
        alignItems: 'center', // Centrer l'icône horizontalement
        width: 40, // Largeur du conteneur (ajuster selon besoin)
        height: 40, // Hauteur du conteneur (ajuster selon besoin)
        borderRadius: 10, // Bord arrondi pour l'icône
        marginBottom: 5, // Marges supplémentaires pour éviter le débordement
    },
});