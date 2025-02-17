import { Button } from "@rneui/themed";
import React from "react";
import {useGlobalStyles} from "@/styles/global";
import {PrimaryButtonProps} from "@/lib/definitions";

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
            buttonStyle={useGlobalStyles().primaryButtonStyle}
            titleStyle={{ fontSize: 20 }}
            containerStyle={[useGlobalStyles().buttonContainer, { width }]}
            onPress={actionOnPress}
        />
    );
}

export default PrimaryButton;
