import {StatusBar, View, ScrollView} from "react-native";
import {useGlobalStyles} from "@/styles/global";
import React, {useCallback} from "react";
import {ParentContainerProps} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {useFocusEffect} from "expo-router";

function ParentContainer({children, width='85%'}: ParentContainerProps) {
    const styles = useGlobalStyles();
    const {themeMode, setThemeMode ,theme} = useTheme();

    return (
        <ScrollView contentContainerStyle={{flex: 1}} key={themeMode}>
            <View style={styles.container}>
                <StatusBar
                    barStyle={theme.mode === 'dark'? 'light-content': 'dark-content'}
                    backgroundColor={theme.backgroundSecondary}
                />
                <View style={[styles.innerContainer, { width: width }]}>
                    {children}
                </View>
            </View>
        </ScrollView>
    );
}

export default ParentContainer;