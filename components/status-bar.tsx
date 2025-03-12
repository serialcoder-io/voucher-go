import {StatusBar} from "react-native";
import {Theme} from "@/lib/definitions"
function ThemedStatusBar({theme}: {theme: Theme}) {
    return (
        <StatusBar
            barStyle={theme.mode === 'dark'? 'light-content': 'dark-content'}
            backgroundColor={theme.backgroundSecondary}
        />
    );
}

export default ThemedStatusBar;