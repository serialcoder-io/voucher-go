import React from "react";

// components
import SectionTitle from "@/components/ui/settings/SectionTitle";
import ThemeOption from "@/components/ui/settings/ThemeOption";
import {Card, Divider} from "@rneui/themed";
import {View} from "react-native";

// types
import {ThemeOptionsSectionProps} from "@/types/(tabs).types";
import {ThemeMode} from '@/types'

import {useTheme} from "@/hooks/useTheme";
import {setPreference} from "@/utils";


function ThemeOptionsSection({ styles }: ThemeOptionsSectionProps) {
    const { themeMode, setThemeMode } = useTheme();

    // switch theme
    const changeThemeMode = async(newThemeMode: ThemeMode) => {
        setThemeMode(newThemeMode)
        await setPreference('themeMode', newThemeMode)
    }
    return (
        <>
            <SectionTitle title='Theme' iconName='contrast' />
            <Card containerStyle={styles}>
                <ThemeOption label='Automatique' value='auto' icon='contrast' type='material' themeMode={themeMode} setTheme={changeThemeMode} />
                <Divider />
                <View style={{ width: '100%' }} />
                <ThemeOption label='Light' value='light' icon='sun' type='feather' themeMode={themeMode} setTheme={changeThemeMode} />
                <Divider />
                <ThemeOption label='Dark' value='dark' icon='moon' type='feather' themeMode={themeMode} setTheme={changeThemeMode} />
            </Card>
        </>
    );
}

export default ThemeOptionsSection;