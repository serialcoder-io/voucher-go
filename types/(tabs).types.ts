import React from "react";
import {StyleProp, ViewStyle} from "react-native";

export type HandleScrollParams = {
    event: any;
    nextUrl: string | null;
    setIsBottom: (value: boolean) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export type ThemeOptionsSectionProps = {
    styles?: StyleProp<ViewStyle>;
};

export type LogoutSectionProps = {
    confirmLogout: () => void;
};

export type DropdownWrapperProps = {
    showProfileSettingss: boolean,
    setShowProfileSettings: (showProfileSettingss: boolean) => void,
}