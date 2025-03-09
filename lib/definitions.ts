import React from "react";
import {DimensionValue, GestureResponderEvent, KeyboardTypeOptions} from "react-native";
import {Ionicons} from "@expo/vector-icons";

{/*props for ParentContainer component*/
}

export type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

export interface ParentContainerProps {
    children: React.ReactNode;
    width?: DimensionValue; // Use DimensionValue for width
}

export type TabBarIconProps = {
    iconName: keyof typeof Ionicons.glyphMap,
    focused: boolean,
    color: string,
}

export type ThemeOptionsProps = {
    label: string,
    value: 'auto' | 'dark' | 'light',
    icon: string,
    type: string,
    themeMode: 'auto' | 'dark' | 'light',
    setTheme: (newTheme: 'auto' | 'dark' | 'light') => void,
}

export type CustomInputTextProps = {
    value: string,
    onChangeText: (e: string) => void,
    iconName?: string,
    placeholder: string,
    keyboardType?: KeyboardTypeOptions
}

export type PressableProps = {
    text: string;
    iconName: string;
    iconType: string;
    onPress?: (event: GestureResponderEvent) => void;
}

export type PrimaryButtonProps = {
    title: string;
    loading?: boolean;
    actionOnPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    width?: DimensionValue;
}

export type Theme = {
    mode: 'light' | 'dark',
    background: string,
    backgroundSecondary: string,
    textPrimary: string,
    textSecondary: string,
    icon: string,
    tabIconDefault: string,
};
export type InputPasswordProps = {
    placeholder: string;
    secureTextEntry: boolean;
    value: string;
    onChangeText: (e: string) => void;
    onPressIcon: () => void;
    keyboardType?: KeyboardTypeOptions
    maxLength?: number;
}

export type ThemeMode = 'auto' | 'dark' | 'light'
export type Preferences = {
    lang: string;
    themeMode: ThemeMode;
}


export type Jwt = {
    access: string;
    refresh: string;
};


export interface User{
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    username: string;
    last_login?: string;
}

export type LoginFormProps = {
    username: string;
    password: string;
    setUsername: (name: string) => void;
    setPassword: (name: string) => void;
    checked: boolean;
    setChecked: (checked: boolean) => void;
    secureTextEntry: boolean;
    setSecureTextEntry: (secureTextEntry: boolean) => void;
    loading: boolean;
    handleSubmit: () => void
}

export type Company = {
    id: number
    company_name: string
}
export type Shop = {
    id: number,
    location: string,
    address?: string,
    company: Company
}