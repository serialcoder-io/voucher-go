import AsyncStorage from '@react-native-async-storage/async-storage';
import {Preferences, ThemeMode} from "@/lib/definitions";
import {Jwt} from "@/lib/definitions";

export function testStringRegEx(str: string, regEx: RegExp): boolean {
    return regEx.test(str.trim());
}

const defaultPreferences = {
    lang: 'en',
    themeMode: 'auto' as ThemeMode,
}

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

export async function getPreference(): Promise<Preferences | null> {
    try {
        const jsonValue = await AsyncStorage.getItem('preferences');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Erreur lors de la récupération des préférences:', error);
        return null;
    }
}

type loginResponse = {
    results: Jwt | string,
    http_status_code: number,
}

export async function Login(username: string, password: string): Promise<loginResponse> {
    try {
        const response = await fetch('http://127.0.0.1:8000/vms/auth/token/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                results: data.detail || 'Une erreur est survenue',
                http_status_code: response.status,
            };
        }
        return {
            results: data as Jwt,
            http_status_code: response.status,
        };
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error('Sorry, something went wrong: ' + JSON.stringify(e));
        }
    }
}