import {Divider} from "@rneui/themed";
import CustomPressable from "@/components/ui/customPressable";
import {View} from "react-native";
import React from "react";
import {getStyles} from "@/styles/(tabs)/settings.styles";
import {DropdownWrapperProps} from "@/types/(tabs).types";
import {useRouter} from "expo-router";
import {useTheme} from "@/hooks/useTheme";

function DropdownWrapper({showProfileSettingss, setShowProfileSettings}: DropdownWrapperProps) {
    const router = useRouter();
    const {theme} = useTheme();
    const styles = getStyles(theme);
    type AllowedUrls = "/account" | "/account/changePassword"


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
                onPress={() => navigate('/account/changePassword')}
            />
        </View>
    )
}

export default DropdownWrapper;