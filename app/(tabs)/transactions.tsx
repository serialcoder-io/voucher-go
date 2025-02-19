import {View} from "react-native";
import {Text} from "@rneui/themed"
import {getPreference} from "@/lib/utils";
import {useState, useEffect} from "react";
import {Preferences} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";

function Transactions(){
    const [prefs, setPrefs] = useState<Preferences | null>(null);
    const {themeMode, theme} = useTheme();
    useEffect(() => {
        const getPrefs = async() =>{
            try {
                const preferences = await getPreference()
                setPrefs(preferences)
            }catch (e: unknown){
                if (e instanceof Error) {
                    throw new Error('Error in storing preference: ' + e.message);
                } else {
                    throw new Error('Unknown error in storing preference');
                }
            }
        }
        getPrefs()
    }, [theme, themeMode]);
    return (
        <View>
            <Text>{prefs ? JSON.stringify(prefs) : 'No preferences found'}</Text>
            <Text>{JSON.stringify(theme)}</Text>
        </View>
    )
}

export default Transactions;