import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const VoucherSkelton = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E0DDDD",
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
        backgroundColor: "#FFF",
        borderRadius: 5,
    },
});

export default VoucherSkelton;
