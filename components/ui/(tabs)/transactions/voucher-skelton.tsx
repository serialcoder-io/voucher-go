import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";

const VoucherSkelton = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;
    const {theme} = useTheme();
    const styles = getStyles(theme);
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.skeleton, { width: 110, opacity }]} />
            <Animated.View style={[styles.skeleton, { width: 180, opacity }]} />
        </View>
    );
};

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.mode == "light" ? "#d9d9d9" : theme.backgroundSecondary,
        paddingHorizontal: 15,
        marginVertical: 8,
        borderRadius: 10,
        width: "100%",
        height: 60,
        justifyContent: "center",
        rowGap: 10,
    },
    skeleton: {
        height: 15,
        backgroundColor: theme.mode == "light" ? "#FFF" : "rgba(132,133,140,0.62)",
        borderRadius: 5,
    },
});

export default VoucherSkelton;
