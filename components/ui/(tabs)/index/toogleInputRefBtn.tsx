import {Icon, Text} from "@rneui/themed";
import {Pressable, StyleSheet} from "react-native";
import React from "react";
import {Theme} from "@/types";
import {useGlobalStyles} from "@/styles";

type ToogleInputRefBtnProps = {
    theme: Theme;
    showInput: boolean;
    setShowInput: (value: boolean) => void;
}

function ToogleInputRefBtn({ theme, showInput, setShowInput}: ToogleInputRefBtnProps) {
    return (
        <Pressable
            onPress={() => setShowInput(!showInput)}
            style={styles.showInputRefBtn}
            hitSlop={20}
        >
            <Icon
                name={showInput ? 'chevron-down': 'chevron-right'}
                size={25} color={theme.textPrimary} type="feather"
            />
            <Text style={{fontSize: 16, color: theme.textPrimary}}>Enter the reference manually</Text>
        </Pressable>
    )
}

export default ToogleInputRefBtn;

const styles = StyleSheet.create({
    showInputRefBtn:{
        width:'100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },
});