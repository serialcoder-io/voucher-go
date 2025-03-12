import {View, ScrollView} from "react-native";
import {useGlobalStyles} from "@/styles/global";
import {ParentContainerProps} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import ThemedStatusBar from "@/components/status-bar";

function ParentContainer({children, width='85%'}: ParentContainerProps) {
    const styles = useGlobalStyles();
    const {themeMode ,theme} = useTheme();

    return (
        <ScrollView contentContainerStyle={{flex: 1}} key={themeMode}>
            <View style={styles.container}>
                <ThemedStatusBar theme={theme}/>
                <View style={[styles.innerContainer, { width: width }]}>
                    {children}
                </View>
            </View>
        </ScrollView>
    );
}

export default ParentContainer;