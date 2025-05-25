import React from "react";

// components
import SectionTitle from "@/app/(tabs)/components/settings/SectionTitle";
import ThemeOption from "@/app/(tabs)/components/settings/ThemeOption";
import {Card, Divider} from "@rneui/themed";
import {View} from "react-native";

// types
import {ThemeOptionsSectionProps} from "@/app/(tabs)/types";
import {ThemeMode} from '@/lib/definitions'

import {useTheme} from "@/hooks/useTheme";
import {setPreference} from "@/lib/utils";


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