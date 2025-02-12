import {StatusBar, View, ScrollView, DimensionValue} from "react-native";
import {globalStyles} from "@/styles/global";
import React from "react";


interface ParentContainerProps {
    children: React.ReactNode;
    width?: DimensionValue; // Use DimensionValue for width
}

function ParentContainer({children, width='85%'}: ParentContainerProps) {
    return (
        <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={globalStyles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={[globalStyles.innerContainer, { width: width }]}>
                    {children}
                </View>
            </View>
        </ScrollView>
    );
}

export default ParentContainer;