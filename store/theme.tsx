import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Appearance } from 'react-native';
import { light, dark } from '@/constants/Colors';
import {Theme} from '@/lib/definitions'

type ThemeMode = 'auto' | 'dark' | 'light';

interface ThemeContextProps {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    theme: Theme;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
    const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemTheme(colorScheme);
        });
        return () => subscription.remove();
    }, []);

    const theme = useMemo(() => {
        const isDark = themeMode === 'dark' || (themeMode === 'auto' && systemTheme === 'dark');
        return isDark ? dark : light;
    }, [themeMode, systemTheme]);

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
