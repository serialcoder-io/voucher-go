import AsyncStorage from '@react-native-async-storage/async-storage';
import {Preferences, ThemeMode, Voucher, WithSelectors} from "@/lib/definitions";
import {StoreApi, UseBoundStore} from "zustand/index";


export const baseUrl = "http://192.168.7.26:8000"

export function testStringRegEx(str: string, regEx: RegExp): boolean {
    return regEx.test(str.trim());
}

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
 * @returns A promise that resolves to the preferences object or null if not found.
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
 * this fucntion check if the voucher is not expired, and return true, false otherwise
 * @param voucher
 */
export const isVoucherExpired = (voucher: Voucher) => {
    // Check if the voucher status is "expired"
    if (voucher.voucher_status === "expired") {
        return true; // If the status is "expired", the voucher is expired
    }

    const expiration_date = voucher.expiry_date ? new Date(voucher.expiry_date) : null;
    const extention_date = voucher.extention_date ? new Date(voucher.extention_date) : null;
    const currentDate = new Date();

    // If an expiration date is present, compare it with the current date
    if (expiration_date && currentDate > expiration_date) {
        // If the expiration date is passed, check for the extension
        return !(extention_date && currentDate <= extention_date);
    }
    return false; // The voucher is not expired if none of the above conditions are met
};


/**
 * this function check if the status of the voucher.
 * if it's issued, return true, false otherwise
 * @param voucher
 */
export const isVoucherInvalidStatus = (voucher: Voucher) => {
    return voucher.voucher_status !== "issued";
};

