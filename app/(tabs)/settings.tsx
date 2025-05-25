import React from 'react';
import {ScrollView, View, StatusBar} from 'react-native';
import {useTheme} from "@/hooks/useTheme";
//import LanguageOption from "@/components/ui/settings/LangOption";
import {useRouter} from "expo-router";
import {useAuthStore} from "@/store/AuthStore";
import {confirmLogout} from "@/utils/auth.utils";
import {getStyles} from "@/styles/(tabs)/settings.styles";

// components
import ThemeOptionsSection from "@/components/ui/settings/ThemeOptionsSection"
import LogoutSection from "@/components/ui/settings/LogoutSection";
import ProfileDropdownCard from "@/components/ui/settings/ProfileDropdownCard";
import {commonColors} from "@/constants/Colors";


function Settings() {
    const {theme} = useTheme();
    const styles = getStyles(theme);
    const router = useRouter();

    const signOut = useAuthStore.use.signOut();
    const logout = async () => {
        signOut()
        router.replace("/auth")
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={commonColors.primaryColor}
                />

                <ProfileDropdownCard />

                <ThemeOptionsSection styles={styles.card} />

                <LogoutSection confirmLogout={()=>confirmLogout(logout)} />
                {/* language options*/}
                {/*
                <SectionTitle title='Langues' iconName='translate' />
                <Card containerStyle={currentStyles.card}>
                    <LanguageOption label='French' value='fr' />
                    <Divider />
                    <LanguageOption label='English' value='en' />
                </Card>*/}
            </View>
        </ScrollView>
    );
}

export default Settings;
