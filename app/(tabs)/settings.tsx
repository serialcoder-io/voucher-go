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
import DropdownCard from "@/components/ui/settings/DropdownCard";
import {commonColors} from "@/constants/Colors";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import NoInternetScreen from '@/components/ui/NoInternet';


function Settings() {
    const {theme} = useTheme();
    const styles = getStyles(theme);
    const router = useRouter();
    const [isConnected, checkNetwork] = useNetworkStatus();
    

    const signOut = useAuthStore.use.signOut();
    const logout = async () => {
        signOut()
        router.replace("/auth")
    }

    if (isConnected === false) {
        return <NoInternetScreen onRetry={checkNetwork} />;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={commonColors.primaryColor}
                />

                <DropdownCard />

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
