import React, { createContext, useState, useMemo, useEffect } from 'react';
import { Appearance } from 'react-native';
import { light, dark } from '@/constants/Colors';
import {Theme} from '@/lib/definitions'
import { getPreference } from '@/lib/utils'

type ThemeMode = 'auto' | 'dark' | 'light';

interface ThemeContextProps {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    theme: Theme;
}



export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');
    const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const preferences = await getPreference();
                if (preferences) {
                    setThemeMode(preferences.themeMode || 'auto');
                }
            } catch (error) {
                console.error('Erreur lors du chargement des préférences:', error);
                setThemeMode('auto');
            }
        };
        loadPreferences();
    }, []);

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