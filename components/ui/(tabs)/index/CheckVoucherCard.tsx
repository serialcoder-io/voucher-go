import {StyleSheet, View} from "react-native";
import ToogleInputRefBtn from "@/components/ui/(tabs)/index/toogleInputRefBtn";
import InputVoucherRef from "@/components/ui/(tabs)/index/input-voucher-ref";
import ScanButton from "@/components/ui/(tabs)/index/scanButton";
import React from "react";
import {Theme} from "@/lib/definitions";
import {useGlobalStyles} from "@/styles/global";

type CheckVoucherCardProps = {
    theme: Theme;
    showInput: boolean;
    setShowInput: (value: boolean) => void;
    isLoading: boolean;
    reference: string;
    setReference: (value: string) => void; // <--- Correction ici
    handleSubmitRef: () => void;
};

function CheckVoucherCard({
  theme,
  showInput,
  setShowInput,
  isLoading,
  reference,
  setReference, // Ajouté dans les props ici
  handleSubmitRef,
}: CheckVoucherCardProps) {
    const styles = getStyles(theme)
    return (
        <View style={styles.CheckContainer}>
            {/* check-voucher container */}
            <View style={styles.checkVoucherConainer}>
                {/* button to show and hide voucher reference field */}
                <ToogleInputRefBtn
                    theme={theme}
                    showInput={showInput}
                    setShowInput={setShowInput}
                />
                {showInput && (
                    <InputVoucherRef
                        styles={styles.inputContainer}
                        reference={reference}
                        setReference={setReference} // Passé correctement ici
                        loading={isLoading}
                        actionOnPress={handleSubmitRef}
                    />
                )}
            </View>
            {/* scan button */}
            <ScanButton />
        </View>
    );
}

export default CheckVoucherCard;


const getStyles = (theme: Theme) => StyleSheet.create({
    CheckContainer:{
        backgroundColor: theme.backgroundSecondary,
        ...useGlobalStyles().center,
        width: '100%',
        borderWidth: 0, borderRadius: 10,
        borderColor: theme.textSecondary,
        elevation: 3
    },
    inputContainer: {
        backgroundColor: theme.backgroundSecondary,
        width: "100%",
        alignItems: "center",
    },
    checkVoucherConainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        padding: 18,
    }
});
