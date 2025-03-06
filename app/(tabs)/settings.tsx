import React, { useState } from 'react';
import {ScrollView, View, StatusBar, StyleSheet} from 'react-native';
import { Card, Divider } from '@rneui/themed';
import CustomPressable from "@/components/ui/custom-pressable";
import ThemeOptions from "@/components/ui/settings/theme-options";
import {useTheme} from "@/hooks/useTheme";
import {Theme, ThemeMode} from '@/lib/definitions'
import SectionTitle from "@/components/ui/section-title";
import LanguageOption from "@/components/ui/settings/lang-option";
import {setPreference} from "@/lib/utils";
import {useRouter} from "expo-router";

function Settings() {
    const [showProfileSettingss, setShowProfileSettings] = useState(false);
    const { themeMode, setThemeMode, theme } = useTheme();
    const currentStyles = styles(theme);
    const router = useRouter();
    const changeThemeMode = async(newThemeMode: ThemeMode) => {
        setThemeMode(newThemeMode)
        await setPreference('themeMode', newThemeMode)
    }

    type AllowedUrls = "/account" | "/account/profile"
    const navigate = (url: AllowedUrls) => {
        if(showProfileSettingss) {
            setShowProfileSettings(false);
        }
        router.push(url);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={currentStyles.container}>
                <StatusBar
                    barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.backgroundSecondary}
                />
                <Card containerStyle={currentStyles.card}>
                    <View style={currentStyles.profileSettingsConainer}>
                        <CustomPressable
                            text='Profile'
                            iconName={showProfileSettingss ? 'chevron-down' : 'chevron-right'}
                            iconType='feather'
                            onPress={() => setShowProfileSettings(!showProfileSettingss)}
                        />
                        {showProfileSettingss && (
                            <View style={currentStyles.profileSettinDropdown}>
                                <Divider />
                                <CustomPressable
                                    text='Index settings'
                                    iconName='user'
                                    iconType='feather'
                                    onPress={() => navigate('/account')}
                                />
                                <Divider />
                                <CustomPressable
                                    text='Personal informations'
                                    iconName='info'
                                    iconType='feather'
                                    onPress={() => navigate('/account/profile')}
                                />
                            </View>
                        )}
                    </View>
                    <Divider />
                    <CustomPressable
                        text='Pin' iconName='lock'
                        iconType='feather' onPress={()=>router.push('../pin/lockScreen')} />
                    <Divider />
                    <CustomPressable text='About shop' iconName='info' iconType='feather' />
                </Card>

                {/* section title (theme)*/}
                <SectionTitle title='Theme' iconName='contrast' />
                {/* theme options*/}
                <Card containerStyle={currentStyles.card}>
                    <ThemeOptions label='Automatique' value='auto' icon='contrast' type='material' themeMode={themeMode} setTheme={changeThemeMode} />
                    <Divider />
                    <View style={{width: '100%'}}></View>
                    <ThemeOptions label='Light' value='light' icon='sun' type='feather' themeMode={themeMode} setTheme={changeThemeMode} />
                    <Divider />
                    <ThemeOptions label='Dark' value='dark' icon='moon' type='feather' themeMode={themeMode} setTheme={changeThemeMode} />
                </Card>

                {/* section title (language)*/}
                <SectionTitle title='Langues' iconName='translate' />
                {/* language options*/}
                <Card containerStyle={currentStyles.card}>
                    <LanguageOption label='French' value='fr' />
                    <Divider />
                    <LanguageOption label='English' value='en' />
                </Card>
            </View>
        </ScrollView>
    );
}

export default Settings;

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.background,
        paddingVertical: 20,
        paddingHorizontal: 18,
        width: '100%',
    },
    card: {
        borderWidth: 0,
        borderRadius: 10,
        width: '100%',
        backgroundColor: theme.backgroundSecondary,
        elevation: 6
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    optionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingTop: 25,
        paddingLeft: 10
    },
    sectionTitleText: {
        fontSize: 16,
        fontWeight: '100',
        color: theme.textPrimary
    },
    profileSettinDropdown: {
        width: "100%",
        paddingLeft: 20
    },
    profileSettingsConainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
});
