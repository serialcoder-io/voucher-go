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
    value: string,
    icon: string,
    type: string,
    theme: string,
    setTheme: (newTheme: string) => void,
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
