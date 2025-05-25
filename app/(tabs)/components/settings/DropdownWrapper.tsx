import {Divider} from "@rneui/themed";
import CustomPressable from "@/components/ui/custom-pressable";
import {View} from "react-native";
import React from "react";
import {getStyles} from "@/app/(tabs)/styles/settings.styles";
import {DropdownWrapperProps} from "@/app/(tabs)/types";

function DropdownWrapper({showProfileSettingss, setShowProfileSettings}: DropdownWrapperProps) {

    const styles = getStyles(theme);
    type AllowedUrls = "/account" | "/account/change-password"


    const navigate = (url: AllowedUrls) => {
        if(showProfileSettingss) {
            setShowProfileSettings(false);
        }
        router.push(url);
    }

    return (
        <View style={styles.profileSettinDropdown}>
            <Divider />
            <CustomPressable
                text='Profile'
                iconName='user'
                iconType='feather'
                onPress={() => navigate('/account')}
            />
            <Divider />
            <CustomPressable
                text='Change password'
                iconName='key'
                iconType='feather'
                onPress={() => navigate('/account/change-password')}
            />
        </View>
    )
}

export default DropdownWrapper;