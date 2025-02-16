import {StatusBar, View, ScrollView, DimensionValue} from "react-native";
import {globalStyles, getGlobalStyles} from "@/styles/global";
import React from "react";
import {ParentContainerProps} from "@/lib/definitions";
import useThemeStore from "@/store/store";


function ParentContainer({children, width='85%'}: ParentContainerProps) {
    const { getTheme } = useThemeStore.getState(); // Récupère le thème actuel
    const theme = getTheme();
    return (
        <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={getGlobalStyles().container}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={[getGlobalStyles().innerContainer, { width: width }]}>
                    {children}
                </View>
            </View>
        </ScrollView>
    );
}

export default ParentContainer;