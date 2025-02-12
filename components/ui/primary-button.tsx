import {Button} from "@rneui/themed";
import React from "react";
import {globalStyles} from "@/styles/global"
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

function PrimaryButton({
    title,
    loading = false,
    actionOnPress,
    disabled = false,
} : {
    title: string;
    loading?: boolean;
    actionOnPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
}){
    return(
        <Button
            disabled={disabled}
            title={title}
            loading={loading}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={globalStyles.primaryButtonStyle}
            titleStyle={{fontSize: 20 }}
            containerStyle={globalStyles.buttonContainer}
            onPress={actionOnPress}
        />
    )
}

export default PrimaryButton