import {StatusBar, View} from "react-native";
import {globalStyles} from "@/styles/global";
import React from "react";

function ParentContainer({children}: {children: React.ReactNode}) {
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <View style={globalStyles.innerContainer}>
                {children}
            </View>
        </View>
    );
}

export default ParentContainer;