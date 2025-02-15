import {StatusBar, View, ScrollView, DimensionValue} from "react-native";
import {globalStyles, getGlobalStyles} from "@/styles/global";
import React from "react";
import {ParentContainerProps} from "@/lib/definitions";


function ParentContainer({children, width='85%'}: ParentContainerProps) {
    return (
        <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={getGlobalStyles().container}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={[globalStyles.innerContainer, { width: width }]}>
                    {children}
                </View>
            </View>
        </ScrollView>
    );
}

export default ParentContainer;