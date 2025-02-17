import {View} from "react-native";
import {Text} from "@rneui/themed"
import {getPreference} from "@/lib/utils";
import {useState, useEffect} from "react";
import {Preferences} from "@/lib/definitions";

function Transactions(){
    const [prefs, setPrefs] = useState<Preferences | null>(null);

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
    }, []);
    return (
        <View>
            <Text>{prefs ? JSON.stringify(prefs) : 'No preferences found'}</Text>
        </View>
    )
}

export default Transactions;