import BorderedInput from "@/components/ui/borderedInput";
import PrimaryButton from "@/components/ui/primaryButton";
import {StyleProp, View, ViewStyle} from "react-native";
import React from "react";

type InputVoucherProps = {
    styles?: StyleProp<ViewStyle>;
    reference: string;
    setReference: (reference: string) => void;
    loading: boolean;
    actionOnPress: () => void;
}

function InputVoucherRef({
    styles,
    reference,
    setReference,
    loading,
    actionOnPress,
}: InputVoucherProps) {
    return (
        <View style={styles}>
            <BorderedInput
                placeholder="Voucher Reference"
                value={reference}
                onChangeText={setReference}
            />
            <PrimaryButton
                disabled={!reference}
                title="Check"
                loading={loading}
                actionOnPress={actionOnPress}
            />
        </View>
    )
}

export default InputVoucherRef;