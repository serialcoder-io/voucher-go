import AsyncStorage from '@react-native-async-storage/async-storage';
import {Preferences, ThemeMode} from "@/lib/definitions";
import {Text, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";

export const baseUrl = "http://192.168.200.83:8000/"

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
