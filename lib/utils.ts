import AsyncStorage from '@react-native-async-storage/async-storage';
import {Preferences, Theme, ThemeMode, WithSelectors} from "@/lib/definitions";
import {StoreApi, UseBoundStore} from "zustand";
import {Toast, ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const defaultPreferences = {
    lang: 'en',
    themeMode: 'auto' as ThemeMode,
}

/**
 * Stores the preferences in AsyncStorage.
 * @param key - The key under which the preferences are saved (default is 'preferences').
 * @param preferences - The preferences to store (default is the `defaultPreferences` object).
 * @throws Will throw an error if there is a problem with saving the preferences.
 */
export async function storePreference(key: string = 'preferences', preferences: Preferences = defaultPreferences) {
    try {
        const jsonValue = JSON.stringify(preferences);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error('Error in storing preference: ' + e.message);
        } else {
            throw new Error('Unknown error in storing preference');
        }
    }
}

/**
 * Sets a preference by updating the value for a given key.
 * @param key - The key of the preference to update.
 * @param newValue - The new value to set for the preference.
 * @throws Will throw an error if there is a problem with saving the preference.
 */
export async function setPreference(key: string, newValue: string) {
    try {
        const jsonValue = await AsyncStorage.getItem('preferences');
        const objValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        if(objValue !== null && objValue !== undefined) {
            objValue[key] = newValue;
            await storePreference('preferences', objValue);
        }else{
            await storePreference()
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error('Error in storing preference: ' + e.message);
        } else {
            throw new Error('Unknown error in storing preference');
        }
    }
}

/**
 * Retrieves the stored preferences.
 * @returns A promise that resolves to the preference object or null if not found.
 */
export async function getPreference(): Promise<Preferences | null> {
    try {
        const jsonValue = await AsyncStorage.getItem('preferences');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Erreur lors de la récupération des préférences:', error);
        return null;
    }
}

// from zustand
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }
    return store
}


/**
 * format the date passed in parameter and return (DD month(long) YYYY at hh:mm).
 * exp 16 March 2025 at 12:30 AM
 * @param inputDate
 */
export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const localDate = date.toLocaleString('en-GB', {
        timeZone: 'Indian/Mauritius',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return localDate.replace(',', ' at ');
};


/**
 * display a toast message
 * @param title
 * @param message
 * @param type
 * @param theme
 */
export const showToast = (
    title: string,
    message: string,
    type: ALERT_TYPE,
    theme: Theme
) => {
    Toast.show({
        type: type,
        title: title,
        titleStyle: {color: theme.textPrimary},
        textBody: message,
        textBodyStyle: {color: theme.textSecondary},
    });
};

/**
 * display react-native-aert-notification modal
 * @param title
 * @param message
 * @param type
 * @param onHide
 */
export const showDialog = (
    title: string,
    message: string,
    type: ALERT_TYPE,
    onHide: () => void,
)=>{
    return (
        Dialog.show({
            type: type,
            title: title,
            textBody: message,
            onHide: onHide
        })
    )
}
