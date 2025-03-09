import {View} from "react-native";
import {Button} from "@rneui/themed";
import {commonColors} from "@/constants/Colors";
import React from "react";

function Loader() {
    return (
        <View
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                paddingHorizontal: 30,
            }}
        >
            <Button
                title="Solid"
                type="outline"
                loading
                buttonStyle={{ borderWidth: 0 }}
                loadingProps={{ size: 60, color: commonColors.primaryColor }}
            />
        </View>
    );
}

export default Loader;