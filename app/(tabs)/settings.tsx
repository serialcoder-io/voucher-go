import React from 'react';
import {ScrollView, View, StatusBar} from 'react-native';
import {useTheme} from "@/hooks/useTheme";
//import LanguageOption from "@/components/ui/settings/LangOption";
import {useRouter} from "expo-router";
import {useAuthStore} from "@/store/AuthStore";
import {confirmLogout} from "@/app/auth/auth.utils";
import {getStyles} from "@/app/(tabs)/styles/settings.styles";

// components
import ThemeOptionsSection from "@/app/(tabs)/components/settings/ThemeOptionsSection"
import LogoutSection from "@/app/(tabs)/components/settings/LogoutSection";
import ProfileDropdownCard from "@/app/(tabs)/components/settings/ProfileDropdownCard";


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
                    barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.backgroundSecondary}
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
