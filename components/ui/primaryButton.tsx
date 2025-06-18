import { Button } from "@rneui/themed";
import React from "react";
import {PrimaryButtonProps} from "@/types";
import {StyleSheet} from "react-native";
import {commonColors} from "@/constants/Colors";

function PrimaryButton({
   title,
   loading = false,
   actionOnPress,
   disabled = false,
   width = "100%",
}: PrimaryButtonProps): React.ReactElement<PrimaryButtonProps> {
    return (
        <Button
            disabled={disabled}
            title={title}
            loading={loading}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={buttonStyles.primaryButtonStyle}
            titleStyle={{ fontSize: 20 }}
            containerStyle={[buttonStyles.buttonContainer, { width }]}
            onPress={actionOnPress}
        />
    );
}

export default PrimaryButton;


const buttonStyles = StyleSheet.create({
    primaryButtonStyle: {
        backgroundColor: commonColors.primaryColor,
        width: '100%',
        paddingVertical: 8,
        borderRadius: 10,
    },
    buttonContainer: {
        height: 50,
        width: '95%',
        marginVertical: 0,
    },
});