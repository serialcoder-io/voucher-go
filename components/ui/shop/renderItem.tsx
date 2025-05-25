import {Text, View, StyleSheet} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

const RenderItem = (item: {label: string, value: string}, valueName: string) => {
    return (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {item.value === valueName && (
                <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                />
            )}
        </View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17, flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1, fontSize: 16,
        color: "black",
    },
});