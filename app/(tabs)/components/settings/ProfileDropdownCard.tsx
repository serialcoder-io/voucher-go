import {View} from "react-native";
import CustomPressable from "@/components/ui/custom-pressable";
import {Card, Divider} from "@rneui/themed";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {useTheme} from "@/hooks/useTheme";
import {getStyles} from "@/app/(tabs)/styles/settings.styles";
import DropDownWrapper from "@/app/(tabs)/components/settings/DropDownWrapper";

function ProfileDropdownCard(){
    const router = useRouter();
    const {theme} = useTheme();
    const styles = getStyles(theme);
    const [showProfileSettingss, setShowProfileSettings] = useState(false);

    return(
        <Card containerStyle={styles.card}>
            <View style={styles.profileSettingsConainer}>
                <CustomPressable
                    text='Profile'
                    iconName={showProfileSettingss ? 'chevron-down' : 'chevron-right'}
                    iconType='feather'
                    onPress={() => setShowProfileSettings(!showProfileSettingss)}
                />
                {showProfileSettingss && (
                   <DropDownWrapper
                       showProfileSettingss={showProfileSettingss}
                       setShowProfileSettings={setShowProfileSettings}
                   />
                )}
            </View>
            <Divider />
            <CustomPressable
                text='Pin' iconName='lock'
                iconType='feather' onPress={()=>router.push('../pin/lockScreen')}
            />
            <Divider />
            <CustomPressable text='About shop' iconName='info' iconType='feather' />
        </Card>
    )
}

export default ProfileDropdownCard;