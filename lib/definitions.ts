import React from "react";
import {DimensionValue, GestureResponderEvent} from "react-native";
import {Ionicons} from "@expo/vector-icons";

{/*props for ParentContainer component*/}
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
    onChangeText: (e: string) => void
    iconName?: string,
    placeholder: string,
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
}